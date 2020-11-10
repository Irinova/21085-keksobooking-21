'use strict';

(function () {
  const showError = function (error, callback) {
    const main = window.elements.main;
    const errorPopup = window.elements.errorPopup().cloneNode(true);

    const errorText = errorPopup.querySelector(`.error__message`);
    errorText.textContent = error;

    const errorButton = errorPopup.querySelector(`.error__button`);

    const removePopup = function () {
      main.removeChild(errorPopup);
      document.removeEventListener(`keydown`, onEscKeydown);
    };
    const onClick = function () {
      callback();
      if (main.contains(errorButton)) {
        removePopup();
      }
    };
    const onEscKeydown = function (evt) {
      if (evt.key === `Escape` && main.contains(errorButton)) {
        removePopup();
      }
    };

    errorButton.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscKeydown);

    main.appendChild(errorPopup);
  };

  window.popups = {
    showError,
  };
})();
