'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var dialogOpen = document.querySelector('.setup-open');
  var dialogClose = userDialog.querySelector('.setup-close');
  var wizardNameInput = userDialog.querySelector('.setup-user-name');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var wizardSetup = userDialog.querySelector('.setup-player');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  dialogOpen.addEventListener('click', function () {
    openPopup();
  });


  dialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });


  dialogClose.addEventListener('click', function () {
    closePopup();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });


  wizardNameInput.addEventListener('change', function () {
    if (wizardNameInput.validity.tooShort) {
      wizardNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (wizardNameInput.validity.tooLong) {
      wizardNameInput.setCustomValidity('Имя не должно привышать 25-ти символов');
    } else if (wizardNameInput.validity.valueMissing) {
      wizardNameInput.setCustomValidity('Обязательное поле');
    } else {
      wizardNameInput.setCustomValidity('');
    }
  });

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.util.getRandomElement(window.setup.WIZARD_COATS_COLORS);
    wizardCoat.style.fill = coatColor;
    wizardSetup.querySelector('input[name="coat-color"]').value = coatColor;
  });


  wizardEyes.addEventListener('click', function () {
    var eyesColor = window.util.getRandomElement(window.setup.WIZARD_EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    wizardSetup.querySelector('input[name="eyes-color"]').value = eyesColor;
  });


  wizardFireball.addEventListener('click', function () {
    var fireballColor = window.util.getRandomElement(window.setup.WIZARD_FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = fireballColor;
    wizardSetup.querySelector('input[name="fireball-color"]').value = fireballColor;
  });


  var dialogHandler = userDialog.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
