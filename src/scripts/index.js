import '../pages/index.css';
import './cards';
import { openModal, closeModal } from "./modal";
import { createCard, handleClickOnCard } from "./card";

import logo from '../images/logo.svg';
import profileImage from '../images/avatar.jpg';
import { initialCards } from "./cards";

// Коллекция карточек
const placesList = document.querySelector(".places__list");

// Модальное окно изменения данных профиля
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalEditProfileForm = document.forms['edit-profile'];
const changeProfileBtn = document.querySelector(".profile__edit-button");

// Модальное окно добавления карточки
const modalNewPlace = document.querySelector(".popup_type_new-card");
const modalNewPlaceForm = document.forms['new-place'];
const addPlaceBtn = document.querySelector(".profile__add-button");

// Инициализация
function loadImage({ imageUrl, alt, className }) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.src = imageUrl;
        img.alt = alt;
        img.className = className;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Ошибка загрузки: ${ imageUrl }`));
    });
}

function loadBackground({ imageUrl, className }) {
    return new Promise((resolve, reject) => {
        const testImg = new Image();
        testImg.src = imageUrl;

        testImg.onload = () => {
            const div = document.createElement('div');

            div.className = className;
            div.style.backgroundImage = `url(${ imageUrl })`;

            resolve(div);
        };

        testImg.onerror = () => reject(new Error(`Ошибка загрузки фона: ${ imageUrl }`));
    });
}

loadImage({
    imageUrl: logo,
    alt: 'Логотип проекта масто',
    className: 'logo header__logo'
})
    .then((logoImg) => document.querySelector('header').prepend(logoImg))
    .catch((err) => console.error(err));

loadBackground({
    imageUrl: profileImage,
    className: 'profile__image'
})
    .then((profileDiv) => document.querySelector('.profile').prepend(profileDiv))
    .catch((err) => console.error(err));

initialCards.reverse().forEach((data) => {
    createCard(data.name, data.link);
});

// Функции-обработчики
function handleEditProfileFormSubmit(e) {
    e.preventDefault();

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = modalEditProfileForm.elements['name'].value;
    profileDescription.textContent = modalEditProfileForm.elements['description'].value;

    closeModal(modalEditProfile);
    modalEditProfile.removeEventListener('submit', handleEditProfileFormSubmit);
}

changeProfileBtn.addEventListener("click", () => {
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    modalEditProfileForm.elements['name'].value = profileTitle.textContent;
    modalEditProfileForm.elements['description'].value = profileDescription.textContent;

    openModal(modalEditProfile);
    modalEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
});

function handleAddNewPlaceFormSubmit(e) {
    e.preventDefault();

    const placeName = modalNewPlaceForm.elements['place-name'].value;
    const placeLink = modalNewPlaceForm.elements['link'].value;

    createCard(placeName, placeLink);
    closeModal(modalNewPlace);
    modalNewPlace.removeEventListener('submit', handleAddNewPlaceFormSubmit);
    modalNewPlaceForm.reset();
}

addPlaceBtn.addEventListener("click", () => {
    openModal(modalNewPlace);
    modalNewPlace.addEventListener('submit', handleAddNewPlaceFormSubmit);
});

placesList.addEventListener("click", handleClickOnCard);


