'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;


var userDialog = document.querySelector('.setup');// Choosing wizard window
var dialogOpen = document.querySelector('.setup-open');// Choosing icon with avatar
var dialogClose = userDialog.querySelector('.setup-close');// span Close button
var wizardNameInput = userDialog.querySelector('.setup-user-name');// input for wizard's name
var wizardSetup = userDialog.querySelector('.setup-player');
var wizardCoat = userDialog.querySelector('.wizard-coat');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var similarListElement = document.querySelector('.setup-similar-list');// Characters list
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


// Function for choosing random element
var getRandomElement = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
};

// Function for generation wizard's characters
var createWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i++) {
    wizards.push({
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COATS_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
    });
  }
  return wizards;
};

// Function for creating DOM element from JS
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Adding elements
var fragment = document.createDocumentFragment();
var wizards = createWizards(WIZARDS_AMOUNT);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// -----------------------module 4 - task 1---------------------- //
// Function closing window with ESC button
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== wizardNameInput) {
    closePopup();
  }
};

// Function for opening window
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Function for closing window
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Event of opening window
dialogOpen.addEventListener('click', function () {
  openPopup();
});

// Event of opening window with Enter
dialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Event of closing window
dialogClose.addEventListener('click', function () {
  closePopup();
});
// Event of closing window with ESC
dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//  Name validation
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

// Event for changing coat color
wizardCoat.addEventListener('click', function () {
  var coatColor = getRandomElement(WIZARD_COATS_COLORS);
  wizardCoat.style.fill = coatColor;
  wizardSetup.querySelector('input[name="coat-color"]').value = coatColor;
});

// Event for changing eyes color
wizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomElement(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = eyesColor;
  wizardSetup.querySelector('input[name="eyes-color"]').value = eyesColor;
});

// Event for changing fireball color
wizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = fireballColor;
  wizardSetup.querySelector('input[name="fireball-color"]').value = fireballColor;
});
