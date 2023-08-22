const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const button = document.querySelectorAll('button');

btnStart.addEventListener('click', () => {
  colorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    btnStop.removeAttribute('disabled');
    btnStart.setAttribute('disabled', true);
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(colorId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', false);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
