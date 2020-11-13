'use strict';

(function () {
  const createCard = function () {
    const cardElement = window.elements.card();
    const card = cardElement.cloneNode(true);

    closeCard(card);
    const closeButton = card.querySelector(`.popup__close`);
    closeButton.addEventListener(window.constants.EVENT.click, () => closeCard(card));
    closeButton.addEventListener(window.constants.EVENT.keydown, function (evt) {
      if (evt.key === `Enter`) {
        closeCard(card);
      }
    });
    const map = window.elements.map;
    map.insertBefore(card, map.querySelector(`.map__filters-container`));
    return card;
  };

  const card = createCard();

  function closeCard(cardElement) {
    cardElement.classList.add(`hidden`);
  }

  // Скрывает текстовые поля без данных
  function verifyAndAddTextData(cardElement, selector, textData, dataMap) {
    if (textData !== null) {
      cardElement.querySelector(selector).textContent = dataMap;
    } else {
      cardElement.querySelector(selector).hidden = true;
    }
  }

  function createImg(photo) {
    const img = document.createElement('img');
    img.src = photo;
    img.className = 'popup__photo';
    img.width = 45;
    img.height = 45;
    img.setAttribute('alt', 'Фотография жилья');
    return img;
  }

  // Скрывает фотографии без данных
  function verifyAndAddPhotos(photos) {
    const photosBlock = card.querySelector(`.popup__photos`);
    photosBlock.innerHTML = '';
    for (let photo of photos) {
      photosBlock.appendChild(createImg(photo));
    }
  }

  // Обновляет данные в карточке
  const updateCard = function (cardData) {
    const fields = [
      {
        className: `.popup__title`,
        field: cardData.offer.title,
        text: cardData.offer.title
      },
      {
        className: `.popup__text--address`,
        field: cardData.offer.address,
        text: cardData.offer.address
      },
      {
        className: `.popup__text--price`,
        field: cardData.offer.price,
        text: `${cardData.offer.price} ₽/ночь`
      },
      {
        className: `.popup__type`,
        field: cardData.offer.type,
        text: window.localization.localizeType(cardData.offer.type)
      },
      {
        className: `.popup__text--capacity`,
        field: cardData.offer.rooms,
        text: `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`
      },
      {
        className: `.popup__text--time`,
        field: cardData.offer.checkin,
        text: `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`
      },
      {
        className: `.popup__features`,
        field: cardData.offer.features,
        text: cardData.offer.features.join(`, `)
      },
      {
        className: `.popup__description`,
        field: cardData.offer.description,
        text: cardData.offer.description
      }
    ];
    fields.forEach((field) => verifyAndAddTextData(card, field.className, field.field, field.text));

    card.querySelector(`.popup__avatar`).src = cardData.author.avatar;

    verifyAndAddPhotos(cardData.offer.photos);
  };

  const openCard = function () {
    card.classList.remove(`hidden`);
  };

  const hideCard = function () {
    closeCard(card);
  };

  window.filters.addOnChangeFilterObserver(function () {
    hideCard();
  });

  window.card = {
    openCard,
    updateCard,
    hideCard
  };
})();
