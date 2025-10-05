/**
 * Определяет тип ошибки поля, и возвращает его ключ и текст
 */
function messageType(input) {
    const v = input.validity;

    // Упорядоченный по степени влияния список используемых ключей ошибок
    const order = [
        'valueMissing',
        'typeMismatch',
        'tooShort',
        'tooLong',
        'patternMismatch',
    ];

    const defaults = {
        valueMissing: 'Вы пропустили это поле.',
        typeMismatch: 'Неверный формат.',
        tooShort: `Минимальное количество символов: ${ input.minLength }. Длина текста сейчас: ${ input.value.length } символ.`,
        tooLong: `Максимальное количество символов: ${ input.maxLength }. Длина текста сейчас: ${ input.value.length } символ.`,
        patternMismatch: 'Значение не соответствует формату.',
    };

    // Поиск текста ошибок в data-* атрибутах
    const readData = (attr) => input.getAttribute(`data-${ attr }`);

    const dataAttrByKey = {
        valueMissing: [ 'error-required' ],
        typeMismatch: [ 'error-type' ],
        tooShort: [ 'error-too-short' ],
        tooLong: [ 'error-too-long' ],
        patternMismatch: [ 'error-pattern' ],
    };

    for (const key of order) {
        if (v[key]) {
            const candidates = dataAttrByKey[key] || [];

            for (const name of candidates) {
                const val = readData(name);

                if (val) return { key, message: val };
            }

            return { key, message: defaults[key] || input.validationMessage || 'Неверное значение.' };
        }
    }

    return { key: 'valid', message: input.validationMessage || '' };
}

/**
 * Возвращает span для ошибки конкретного поля.
 */
function findErrorSpan(form, input) {
    return form.querySelector(`.${ input.id }-input-error`);
}

/**
 * Переключает состояние кнопки submit.
 */
function toggleSubmit(form, forceReset, {
    submitButtonSelector,
    inactiveButtonClass
}) {
    const btn = form.querySelector(submitButtonSelector);

    if (!btn) return;

    let isValid = false;

    if (!forceReset) {
        isValid = form.checkValidity();
    }

    btn.disabled = !isValid;
    btn.classList.toggle(inactiveButtonClass, !isValid);
}

/**
 * Показывает ошибку для поля
 */
function showInputError(form, input, {
    inputErrorClass,
    errorClass
}) {
    const span = findErrorSpan(form, input);

    if (!span) return;

    const { message } = messageType(input);

    input.classList.add(inputErrorClass);
    span.textContent = message;
    span.classList.add(errorClass);
}

/**
 * Скрывает ошибку для поля
 */
function hideInputError(form, input, {
    inputErrorClass,
    errorClass
}) {
    const span = findErrorSpan(form, input);

    if (!span) return;

    input.classList.remove(inputErrorClass);
    span.textContent = '';
    span.classList.remove(errorClass);
}

/**
 * Обновляет состояние конкретного поля: показывает или скрывает ошибку,
 * затем пересчитывает состояние кнопки.
 */
function updateFieldState(form, input, settings) {
    if (!input.checkValidity()) {
        showInputError(form, input, settings);
    } else {
        hideInputError(form, input, settings);
    }

    toggleSubmit(form, false, settings);
}

/**
 * Сбрасывает все ошибки валидации в форме и блокирует кнопку сабмита.
 */
function clearValidation(form, {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
    const settings = {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    };

    const inputs = Array.from(form.querySelectorAll(settings.inputSelector || '.popup__input'));

    inputs.forEach((input) => hideInputError(form, input, settings));
    toggleSubmit(form, true, settings);
}

/**
 * Включает кастомную валидацию на форму
 */
function enableValidation({
                              formSelector,
                              inputSelector,
                              submitButtonSelector,
                              inactiveButtonClass,
                              inputErrorClass,
                              errorClass
                          }) {
    const settings = {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    };
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach((form) => {
        // Стартовое состояние кнопки
        toggleSubmit(form, false, settings);

        // Навешиваем слушатели на все инпуты
        const inputs = Array.from(form.querySelectorAll(inputSelector));

        inputs.forEach((input) => {
            input.addEventListener('input', () => updateFieldState(form, input, settings));
        });
    });
}

export { enableValidation, clearValidation };