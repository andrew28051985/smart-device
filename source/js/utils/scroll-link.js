const feedback = document.querySelector('#feedback');
const mainScreen = document.querySelector('.main-screen');
const link = mainScreen.querySelector('a');

const scrollToLink = () => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    feedback.scrollIntoView({
      behavior: 'smooth', block: 'start', inline: 'center',
    });
  });

};

export {scrollToLink};
