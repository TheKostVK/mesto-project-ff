import { openModal } from "./modal";

function buildCard(img, placeName) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.replaceWith(img);

    img.alt = placeName;
    cardElement.querySelector('.card__title').textContent = placeName;

    return cardElement;
}

function loadImg(placeName, placeLink) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.classList.add('card__image');
        img.src = placeLink;
        img.alt = placeName;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Ошибка загрузки: ${ placeLink }`));
    });
}

function createCard(placeName, placeLink) {
    loadImg(placeName, placeLink)
        .then((img) => {
            const cardEl = buildCard(img, placeName);

            document.querySelector('.places__list').prepend(cardEl);
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleClickDeleteCard(evt) {
    const card = evt.target.closest('.card');

    if (card) card.remove();
}

function handleClickLikeCard(evt) {
    evt.target.classList.toggle('card__like-button--active');
}

function handleClickViewImgCard(evt) {
    const modalViewImg = document.querySelector(".popup_type_image");
    const img = modalViewImg.querySelector('.popup__image');
    const description = modalViewImg.querySelector('.popup__caption');

    description.textContent = evt.target.alt;
    img.src = evt.target.src;

    openModal(modalViewImg);
}

function handleClickOnCard(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
        handleClickDeleteCard(evt);

        return;
    }

    if (evt.target.classList.contains('card__like-button')) {
        handleClickLikeCard(evt);

        return;
    }

    if (evt.target.classList.contains('card__image')) {
        handleClickViewImgCard(evt);
    }
}

export { createCard, handleClickOnCard };