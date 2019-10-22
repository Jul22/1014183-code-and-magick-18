'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  function getRandomElement(array) {
    var min = 0;
    var max = array.length;
    return array[Math.floor(Math.random() * (max - min)) + min];
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  function getMaxElement(arr) {
    var maxElement = arr[0];

    if (arr.length === 0) {
      maxElement = 0;
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }

  window.util = {
    getRandomElement: getRandomElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getMaxElement: getMaxElement
  };
})();
