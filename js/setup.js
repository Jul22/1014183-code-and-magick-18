'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_AMOUNT = 4;

  var userDialog = document.querySelector('.setup');// Choosing wizard window
  var similarListElement = document.querySelector('.setup-similar-list');// Characters list
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  window.setup = {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    WIZARD_COATS_COLORS: WIZARD_COATS_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS
  };

  //  Function for generation wizard's characters
  var createWizards = function (amount) {
    var wizards = [];

    for (var i = 0; i < amount; i++) {
      wizards.push({
        name: window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SURNAMES),
        coatColor: window.util.getRandomElement(WIZARD_COATS_COLORS),
        eyesColor: window.util.getRandomElement(WIZARD_EYES_COLORS)
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
})();
