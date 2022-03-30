const wrapperDescription = document.querySelector('.about-company__wrapper-description');
const descriptionList = wrapperDescription.querySelectorAll('p');
const button = wrapperDescription.querySelector('button');
const MIN_LENGTH_DESCRIPTION = 2;

const deletePartDescription = () => {
  for (let i = MIN_LENGTH_DESCRIPTION; i < descriptionList.length; i++) {
    descriptionList[i].remove();
    button.textContent = 'подробнее';
  }
};

const appendPartDescription = () => {
  for (let i = MIN_LENGTH_DESCRIPTION; i < descriptionList.length; i++) {
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

const getMinimazeAbout = () => {
  button.classList.remove('btn--no-js-description');
  deletePartDescription();
  onClickButton();
};

export {getMinimazeAbout};
