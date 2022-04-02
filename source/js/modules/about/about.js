const wrapperDescription = document.querySelector('.about-company__wrapper-description');
const descriptionList = wrapperDescription.querySelectorAll('p');
const button = wrapperDescription.querySelector('button');
const MIN_LENGTH_DESCRIPTION = 2;
const MIN_ELEMENT = MIN_LENGTH_DESCRIPTION - 1;
const MIN_WORD_DESCRIPTION = 11;
const breakpoint = window.matchMedia('(max-width:767px)');

const deletePartDescription = () => {
  for (let i = MIN_LENGTH_DESCRIPTION; i < descriptionList.length; i++) {
    descriptionList[i].remove();
    button.textContent = 'подробнее';
  }

  if (getMinimazeMobile()) {
    const clone = descriptionList[MIN_ELEMENT].cloneNode(true);
    const arrayDescriptionAll = clone.textContent;
    const arrayDescriptionFragment = arrayDescriptionAll.split(' ', MIN_WORD_DESCRIPTION);
    clone.textContent = arrayDescriptionFragment.join(' ');
    descriptionList[MIN_ELEMENT].remove();
    wrapperDescription.insertBefore(clone, button);
  }
};

const appendPartDescription = () => {
  const list = wrapperDescription.querySelectorAll('p');
  list[MIN_ELEMENT].remove();

  for (let i = MIN_LENGTH_DESCRIPTION - 1; i < descriptionList.length; i++) {
    wrapperDescription.insertBefore(descriptionList[i], button);
    button.textContent = 'свернуть';
  }
};

const onClickButton = () => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    const countPartDescription = wrapperDescription.querySelectorAll('p');
    const isSmallDescription = countPartDescription.length === MIN_LENGTH_DESCRIPTION;
    if (isSmallDescription) {
      appendPartDescription();
    } else {
      deletePartDescription();
    }
  });
};

const getMinimazeMobile = function () {
  return breakpoint.matches ? true : false;
};

const getMinimazeAbout = () => {
  button.classList.remove('btn--no-js-description');
  deletePartDescription();
  onClickButton();
};

breakpoint.addListener(getMinimazeMobile);

export {getMinimazeAbout, getMinimazeMobile};
