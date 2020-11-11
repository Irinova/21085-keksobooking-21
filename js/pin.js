'use strict';

(function () {
  function addPin(pinData, template, mapElement) {
    const pin = template.cloneNode(true);
    const PIN_WIDTH = 40;
    const PIN_HEIGHT = 40;
    pin.style.left = pinData.location.x + PIN_WIDTH / 2 + `px`;
    pin.style.top = pinData.location.y - PIN_HEIGHT / 2 + `px`;
    pin.querySelector(`img`).src = pinData.author.avatar;
    pin.querySelector(`img`).alt = pinData.offer.title;
    pin.addEventListener(`click`, function () {
      window.card.openCard();
      window.card.updateCard(pinData);
    });
    pin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.card.openCard();
        window.card.updateCard(pinData);
      }
    });
    mapElement.querySelector(`.map__pins`).appendChild(pin);
  }

  const addPins = function () {
    const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const onSuccess = function (data) {
      const map = window.elements.map;
      for (let ad of data) {
        addPin(ad, template, map);
      }
    };
    const onError = function (error) {
      window.popups.showError(error);
    };
    window.data.load(window.constants.dataUrl, onSuccess, onError);
  };

  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => window.elements.map.querySelector(`.map__pins`).removeChild(pin));
  };

  window.pins = {
    addPins,
    removePins,
  };
})();