const footer = document.querySelector('.page-footer');
const footerNav = footer.querySelector('.page-footer__nav');
const buttonNav = footerNav.querySelector('.page-footer__button');
const descriptionNav = footerNav.querySelector('dd');
const footerContacts = footer.querySelector('.page-footer__contacts');
const buttonContacts = footerContacts.querySelector('.page-footer__button');
const descriptionContacts = footerContacts.querySelector('dd');

const getButtonActive = (evt, isActiveTab) => {
  const buttons = footer.querySelectorAll('button');
  buttons.forEach((button) => {
    const span = button.lastElementChild;
    if (button === evt.target && !isActiveTab) {
      span.textContent = '-';
    } else {
      span.textContent = '+';
    }
  });
};

const accordion = () => {
  descriptionNav.classList.add('no-active');
  descriptionContacts.classList.add('no-active');
  buttonNav.classList.add('page-footer__button--tab-js');
  buttonContacts.classList.add('page-footer__button--tab-js');
  buttonNav.lastElementChild.classList.remove('page-footer__button--no-js');
  buttonContacts.lastElementChild.classList.remove('page-footer__button--no-js');
  buttonContacts.classList.remove('page-footer__button--tab-no-js');
  buttonNav.classList.remove('page-footer__button--tab-no-js');
  buttonNav.lastElementChild.classList.add('page-footer__button--js');
  buttonContacts.lastElementChild.classList.add('page-footer__button--js');
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
