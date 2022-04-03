/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const validityInputName = /^[А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23}$/;
const validityInputNumber = /^[+]{1}[7]{1}[(]{1}[0-9]{1,10}[)]{1}[0-9]{1,10}$/;
const feedbackSection = document.querySelector('.feedback');
const feedbackForm = feedbackSection.querySelector('.feedback-form');
const inputPhoneFeedback = feedbackForm.querySelector('#phone');
const inputNameFeedback = feedbackForm.querySelector('#name');
const modalSection = document.querySelector('.modal__content-wrapper');
const modalForm = modalSection.querySelector('.feedback-form');
const inputPhoneModal = modalForm.querySelector('#phone-modal');
const inputNameModal = modalForm.querySelector('#name-modal');
const MIN_LENGTH_PHONE = 14;
const MAX_LENGTH_PHONE = 14;
const URL_SERVER = 'https://echo.htmlacademy.ru';
const maskPhone = {
  mask: '+7(000)0000000',
  lazy: true,
  placeholderChar: '',
};

const onInputValueMissing = (evt) => {
  const field = evt.target;
  if (field.validity.valueMissing) {
    field.setCustomValidity('Заполните обязательное поле');
    setFormError(field);
  }
};

const onInputValueError = (evt) => {
  const field = evt.target;
  setFormError(field);
};

const setFormError = (nameInput) => {
  nameInput.classList.add('invalid');
};

const setFormValidityOk = (evt) => {
  const field = evt.target;
  field.classList.remove('invalid');
};

const validityForm = (namePhone, name) => {
  namePhone.addEventListener('input', (evt) => {
    const lengthInputPhone = namePhone.value.length;
    const maskFeedback = new IMask(inputPhoneFeedback, maskPhone);
    const maskModal = new IMask(inputPhoneModal, maskPhone);

    if (!validityInputNumber.test(namePhone.value)) {
      onInputValueError(evt);
      namePhone.setCustomValidity('Формат номера: +7(000)0000000');
    } else if (lengthInputPhone < MIN_LENGTH_PHONE) {
      onInputValueError(evt);
      namePhone.setCustomValidity(`Еще нужно ввести минимум ${MIN_LENGTH_PHONE - lengthInputPhone} цыфр`);
    } else if (lengthInputPhone > MAX_LENGTH_PHONE) {
      onInputValueError(evt);
      namePhone.setCustomValidity(`Нужно удалить ${lengthInputPhone - MAX_LENGTH_PHONE} цыфр`);
    } else {
      namePhone.setCustomValidity('');
      setFormValidityOk(evt);
    }
    namePhone.reportValidity();
  });
  name.addEventListener('input', (evt) => {
    const lengthInputName = name.value.length;
    if (!validityInputName.test(name.value)) {
      onInputValueError(evt);
      name.setCustomValidity('Имя должно содержать только буквы и начинаться с заглавной');
    } else if (lengthInputName > 0) {
      name.setCustomValidity('');
      setFormValidityOk(evt);
    } else {
      onInputValueError(evt);
      name.setCustomValidity('Введите свое имя');
    }
  });

  namePhone.addEventListener('invalid', onInputValueMissing, true);
  name.addEventListener('invalid', onInputValueMissing, true);
};

const reset = (nameForm) => {
  const formInputs = nameForm.querySelectorAll('input');
  const formTextArea = nameForm.querySelector('textarea');
  formInputs.forEach((input) => {
    input.value = '';
  });
  formTextArea.value = '';
};

const openErrorAlert = (nameForm) => {
  const alertText = document.createElement('p');

  alertText.classList.add('error');
  alertText.textContent = 'Ошибка отправки! Перезагрузите страницу!';
  nameForm.append(alertText);
  const errorTrue = nameForm.querySelectorAll('.error');
  if (errorTrue.length > 1) {
    alertText.remove();
  }
};

const sendData = ((body, onSuccess, onFail) => {
  fetch(URL_SERVER, {method: 'POST', body}
  ).then((responce) => {
    if (responce.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onFail();
  });
});

const sendUserFormData = (nameForm) => {
  nameForm.addEventListener('submit', (evt) => {
    const field = evt.target;
    evt.preventDefault();
    sendData(new FormData(field), () => reset(nameForm), () => openErrorAlert(nameForm));
  });
};

export {validityForm, sendUserFormData, feedbackForm, modalForm, inputPhoneFeedback, inputPhoneModal, inputNameFeedback, inputNameModal};
