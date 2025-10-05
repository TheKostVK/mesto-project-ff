import '../pages/index.css';
import validationSettings from '../validationSettings.json';
import { enableValidation, clearValidation } from './validation';
import { openModal, closeModal } from "./modal";
import { createCard } from "./card";
import { initialCards } from "./cards";

// Все формы на странице
const formList = document.forms;

// Модальное окно изменения данных профиля
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalEditProfileForm = formList['edit-profile'];
const changeProfileBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Модальное окно добавления карточки
const modalNewPlace = document.querySelector(".popup_type_new-card");
const modalNewPlaceForm = formList['new-place'];
const addPlaceBtn = document.querySelector(".profile__add-button");
const placeNameField = modalNewPlaceForm.elements['place-name'];
const placeLinkField = modalNewPlaceForm.elements['link'];

// Модальное окно просмотра картинки
const modalViewImg = document.querySelector(".popup_type_image");
const img = modalViewImg.querySelector('.popup__image');
const description = modalViewImg.querySelector('.popup__caption');

// Инициализация
initialCards.reverse().forEach(({ name, link }) => {
    createCard({ name, link }, handleClickViewImgCard);
});

// Функции-обработчики
function handleClickViewImgCard({ name, link }) {
    description.textContent = name;
    img.src = link;

    openModal(modalViewImg);
}

/**
 * Функция обработчик отправки значения формы редактирования профиля
 */
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = modalEditProfileForm.elements['name'].value;
    profileDescription.textContent = modalEditProfileForm.elements['description'].value;

    closeModal(modalEditProfile);
}

changeProfileBtn.addEventListener("click", () => {
    modalEditProfileForm.elements['name'].value = profileTitle.textContent;
    modalEditProfileForm.elements['description'].value = profileDescription.textContent;

    openModal(modalEditProfile, () => clearValidation(modalEditProfileForm, validationSettings));
});

/**
 * Функция обработчик отправки значения формы добавления новой карточки
 */
function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    createCard({ name: placeNameField.value, link: placeLinkField.value }, handleClickViewImgCard);
    closeModal(modalNewPlace, () => clearValidation(modalNewPlaceForm, validationSettings));
    modalNewPlaceForm.reset();
}

addPlaceBtn.addEventListener("click", () => {
    openModal(modalNewPlace);
});

modalNewPlace.addEventListener('submit', handleAddNewPlaceFormSubmit);
modalEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

enableValidation(validationSettings);
