import '../pages/index.css';
import './cards';
import { openModal, closeModal } from "./modal";
import { buildCard } from "./card";
import { initialCards } from "./cards";

// Модальное окно изменения данных профиля
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalEditProfileForm = document.forms['edit-profile'];
const changeProfileBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Модальное окно добавления карточки
const modalNewPlace = document.querySelector(".popup_type_new-card");
const modalNewPlaceForm = document.forms['new-place'];
const addPlaceBtn = document.querySelector(".profile__add-button");
const placeNameField = modalNewPlaceForm.elements['place-name'];
const placeLinkField = modalNewPlaceForm.elements['link'];

// Модальное окно просмотра картинки
const modalViewImg = document.querySelector(".popup_type_image");
const img = modalViewImg.querySelector('.popup__image');
const description = modalViewImg.querySelector('.popup__caption');

// Инициализация
function loadImage({ imageUrl, alt, className }) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.classList.add(...className.split(' '));
        img.src = imageUrl;
        img.alt = alt;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Ошибка загрузки: ${ placeLink }`));
    });
}

initialCards.reverse().forEach(({ name, link }) => {
    createCard(name, link, { onView: handleClickViewImgCard });
});

// Функции-обработчики
async function createCard(placeName, placeLink, handlers = {}) {
    const img = await loadImage({ imageUrl: placeLink, alt: placeName, className: 'card__image' });
    const cardEl = buildCard(img, placeName, handlers);

    document.querySelector('.places__list').prepend(cardEl);

    return cardEl;
}

function handleClickViewImgCard(imgEl, { name, link }) {
    description.textContent = name;
    img.src = link;

    openModal(modalViewImg);
}

function handleEditProfileFormSubmit(e) {
    e.preventDefault();

    profileTitle.textContent = modalEditProfileForm.elements['name'].value;
    profileDescription.textContent = modalEditProfileForm.elements['description'].value;

    closeModal(modalEditProfile);
}

changeProfileBtn.addEventListener("click", () => {
    modalEditProfileForm.elements['name'].value = profileTitle.textContent;
    modalEditProfileForm.elements['description'].value = profileDescription.textContent;

    openModal(modalEditProfile);
});

function handleAddNewPlaceFormSubmit(e) {
    e.preventDefault();

    createCard(placeNameField.value, placeLinkField.value, { onView: handleClickViewImgCard });
    closeModal(modalNewPlace);
    modalNewPlaceForm.reset();
}

addPlaceBtn.addEventListener("click", () => {
    openModal(modalNewPlace);
});

modalNewPlace.addEventListener('submit', handleAddNewPlaceFormSubmit);
modalEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
