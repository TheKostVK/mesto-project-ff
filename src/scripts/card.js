// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

const placesWrap = document.querySelector(".places__list");

// Функция создания элемента карточки
function createCardElement(data, onDelete, onLike, onViewImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector(".card__title").textContent = data.name;

    deleteButton.addEventListener("click", onDelete);
    likeButton.addEventListener("click", onLike);
    cardImage.addEventListener("click", onViewImage);

    return cardElement;
}

// Удаление карточки
function handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
}

// Добавление/удаление лайка
function handleActiveLike(evt) {
    evt.target.classList.toggle("card__like-button--active");
}

// Добавление карточки
function createCard(data, handleViewImage) {
    placesWrap.prepend(createCardElement(data, handleDeleteCard, handleActiveLike, handleViewImage));
}

export { createCard };