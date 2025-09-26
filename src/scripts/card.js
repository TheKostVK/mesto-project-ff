// Шаблон
const template = document.querySelector('#card-template').content;

function handleClickDeleteCard(evt) {
    const card = evt.target.closest('.card');

    if (card) card.remove();
}

function handleClickLikeCard(evt) {
    evt.target.classList.toggle('card__like-button--active');
}

function buildCard(img, placeName, handlers = {}) {
    const fragment = template.cloneNode(true);
    const cardEl = fragment.querySelector('.card');

    const imgFromTpl = cardEl.querySelector('.card__image');
    imgFromTpl.replaceWith(img);

    img.alt = placeName;
    cardEl.querySelector('.card__title').textContent = placeName;

    const deleteBtn = cardEl.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', handleClickDeleteCard);

    const likeBtn = cardEl.querySelector('.card__like-button');
    likeBtn.addEventListener('click', handleClickLikeCard);

    img.addEventListener('click', () => {
        handlers.onView?.(img, { name: placeName, link: img.src });
    });

    return cardEl;
}

export { buildCard };