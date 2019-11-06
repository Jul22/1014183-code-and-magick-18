'use strict';
(function () {
  var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_AMOUNT = 4;
  var userDialog = document.querySelector('.setup');// Choosing wizard window
  var similarListElement = document.querySelector('.setup-similar-list');// Characters list
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var form = userDialog.querySelector('.setup-wizard-form');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.length = 4;

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (error) {
    var errorModal = document.createElement('div');
    errorModal.style = 'position: absolute; height: auto; width: 500px; left: 50%; top: 60%; background: #fff; border: 3px solid #157dec; border-radius: 8px; z-index: 100; transform: translate(-50%, -60%)';
    errorModal.fontSize = '30px';
    var errorMessage = document.createElement('h2');
    errorMessage.style = 'color: red; font-size: 30px; text-align: center; text-shadow: none;';
    errorMessage.textContent = error;
    errorModal.appendChild(errorMessage);
    document.body.appendChild(errorModal);
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });
  window.setup = {
    WIZARD_COATS_COLORS: WIZARD_COATS_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS
  };
})();
