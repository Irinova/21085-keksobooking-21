'use strict';

(function () {
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  const selects = window.elements.mapFilters.querySelectorAll('.map__filter');
  const features = window.elements.mapFilters.querySelectorAll('.map__feature');

  function addPin(pinData, template, mapElement) {
    const pin = template.cloneNode(true);
    pin.style.left = pinData.location.x + PIN_WIDTH / 2 + `px`;
    pin.style.top = pinData.location.y - PIN_HEIGHT / 2 + `px`;
    pin.querySelector(`img`).src = pinData.author.avatar;
    pin.querySelector(`img`).alt = pinData.offer.title;
    pin.addEventListener(window.constants.EVENT.click, function () {
      window.card.openCard();
      window.card.updateCard(pinData);
    });
    pin.addEventListener(window.constants.EVENT.keydown, function (evt) {
      if (evt.key === `Enter`) {
        window.card.openCard();
        window.card.updateCard(pinData);
      }
    });
    mapElement.querySelector(`.map__pins`).appendChild(pin);
  }

  const disableSelects = function () {
    [...selects, ...features].forEach((element) => element.setAttribute('disabled', true));
  };
  const enableSelects = function () {
    [...selects, ...features].forEach((element) => element.removeAttribute('disabled'));
  };

  const addPins = function () {
    const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const onSuccess = function (data) {
      enableSelects();
      const filteredData = window.filters.filterData(data);
      const map = window.elements.map;
      for (let ad of filteredData) {
        addPin(ad, template, map);
      }
    };
    const onError = function (error) {
      window.popups.showError(error);
      disableSelects();
    };
    window.data.load(window.constants.dataUrl, onSuccess, onError);
  };

  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => window.elements.map.querySelector(`.map__pins`).removeChild(pin));
  };

  window.filters.addOnChangeFilterObserver(function () {
    removePins();
    addPins();
  });

  window.pins = {
    addPins,
    removePins,
  };
})();
