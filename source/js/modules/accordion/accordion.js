const footer = document.querySelector('.page-footer');
const footerNav = footer.querySelector('.page-footer__nav');
const buttonNav = footerNav.querySelector('.page-footer__button');
const descriptionNav = footerNav.querySelector('dd');
const footerContacts = footer.querySelector('.page-footer__contacts');
const buttonContacts = footerContacts.querySelector('.page-footer__button');
const descriptionContacts = footerContacts.querySelector('dd');
const plusNav = buttonNav.querySelector('.page-footer__button--plus');
const plusContact = buttonContacts.querySelector('.page-footer__button--plus');

const getButtonActive = (evt, isActiveTab) => {
  const buttons = footer.querySelectorAll('button');
  buttons.forEach((button) => {
    const plus = button.querySelector('.page-footer__button--plus');
    const minus = button.querySelector('.page-footer__button--minus');
    if ((button === evt.target || plus === evt.target || minus === evt.target) && !isActiveTab) {
      plus.classList.add('page-footer__button--no-js');
      plus.classList.remove('page-footer__button--js');
      minus.classList.remove('page-footer__button--no-js');
    } else {
      minus.classList.add('page-footer__button--no-js');
      plus.classList.remove('page-footer__button--no-js');
    }
  });
};

const accordion = () => {
  plusContact.classList.remove('page-footer__button--no-js');
  plusNav.classList.remove('page-footer__button--no-js');
  plusContact.classList.add('page-footer__button--js');
  plusNav.classList.add('page-footer__button--js');
  descriptionNav.classList.add('no-active');
  descriptionContacts.classList.add('no-active');
  buttonNav.classList.add('page-footer__button--tab-js');
  buttonContacts.classList.add('page-footer__button--tab-js');
  buttonContacts.classList.remove('page-footer__button--tab-no-js');
  buttonNav.classList.remove('page-footer__button--tab-no-js');
  descriptionNav.classList.remove('no-js');
  descriptionContacts.classList.remove('no-js');

  buttonNav.addEventListener('click', (evt) => {
    evt.preventDefault();
    const isActiveNavTab = descriptionNav.classList.contains('is-active');
    const isActiveContactsTab = descriptionContacts.classList.contains('is-active');
    if (!isActiveNavTab && !isActiveContactsTab) {
      getButtonActive(evt, isActiveNavTab);
      descriptionNav.classList.remove('no-active');
      descriptionNav.classList.add('is-active');
    } else
    if (!isActiveNavTab && isActiveContactsTab) {
      getButtonActive(evt, isActiveNavTab);
      descriptionNav.classList.remove('no-active');
      descriptionNav.classList.add('is-active');
      descriptionContacts.classList.add('no-active');
      descriptionContacts.classList.remove('is-active');
    } else {
      getButtonActive(evt, isActiveNavTab);
      descriptionNav.classList.add('no-active');
      descriptionNav.classList.remove('is-active');
    }
  });

  buttonContacts.addEventListener('click', (evt) => {
    evt.preventDefault();
    const isActiveContactsTab = descriptionContacts.classList.contains('is-active');
    const isActiveNavTab = descriptionNav.classList.contains('is-active');
    if (!isActiveContactsTab && !isActiveNavTab) {
      getButtonActive(evt, isActiveContactsTab);
      descriptionContacts.classList.remove('no-active');
      descriptionContacts.classList.add('is-active');
    } else if (!isActiveContactsTab && isActiveNavTab) {
      getButtonActive(evt, isActiveContactsTab);
      descriptionContacts.classList.remove('no-active');
      descriptionContacts.classList.add('is-active');
      descriptionNav.classList.add('no-active');
      descriptionNav.classList.remove('is-active');
    } else {
      getButtonActive(evt, isActiveContactsTab);
      descriptionContacts.classList.add('no-active');
      descriptionContacts.classList.remove('is-active');
    }
  });
};

export {accordion};
