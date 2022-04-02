const validityInputNumber = /^[0-9]{1,10}$/;
const feedbackSection = document.querySelector('.feedback');
const feedbackForm = feedbackSection.querySelector('.feedback-form');
const inputPhoneFeedback = feedbackForm.querySelector('#phone');
const inputNameFeedback = feedbackForm.querySelector('#name');
const modalSection = document.querySelector('.modal__content-wrapper');
const modalForm = modalSection.querySelector('.feedback-form');
const inputPhoneModal = modalForm.querySelector('#phone-modal');
const inputNameModal = modalForm.querySelector('#name-modal');
const MIN_LENGTH_PHONE = 10;
const MAX_LENGTH_PHONE = 10;
const URL_SERVER = 'https://echo.htmlacademy.ru';

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

    if (!validityInputNumber.test(namePhone.value)) {
      onInputValueError(evt);
      namePhone.setCustomValidity('Номера телефона должен содержать только цыфры');
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
    if (lengthInputName > 0) {
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
