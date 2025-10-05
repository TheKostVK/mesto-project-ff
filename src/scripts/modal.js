function openModal(modal) {
    modal.classList.add("popup_opened");
    addModalListeners(modal);
}

function closeModal(modal) {
    modal.classList.remove("popup_opened");
    removeModalListeners(modal);
}

function handleOverlayClick(e, modal) {
    if (e.target === modal || e.target.classList.contains("popup__close")) {
        closeModal(modal);
    }
}

function handleEscClose(e, modal) {
    if (e.key === "Escape") {
        closeModal(modal);
    }
}

function addModalListeners(modal) {
    modal._overlayHandler = (e) => handleOverlayClick(e, modal);
    modal._escHandler = (e) => handleEscClose(e, modal);

    modal.addEventListener('click', modal._overlayHandler);
    document.addEventListener('keydown', modal._escHandler);
}

function removeModalListeners(modal) {
    modal.removeEventListener("click", modal._overlayHandler);
    document.removeEventListener("keydown", modal._escHandler);

    delete modal._overlayHandler;
    delete modal._escHandler;
}

export { openModal, closeModal };