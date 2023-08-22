import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let timerId;

startBtn.disabled = true;

const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr(
  '#datetime-picker',
  (options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      const currentDate = options.defaultDate;
      const selectedDate = selectedDates[0];

      if (selectedDate <= currentDate) {
        Notify.failure('Please choose a date in the future', {
          width: '500px',
          position: 'center-top',
          cssAnimationStyle: 'from-top',
        });
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }

      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        if (timerId) {
          clearInterval(timerId);
        }
        timerId = setInterval(() => {
          const currentTime = new Date();
          let differenceMc = selectedDate.getTime() - currentTime.getTime();

          timerElements.days.textContent = formatTime(
            convertMs(differenceMc).days
          );
          timerElements.hours.textContent = formatTime(
            convertMs(differenceMc).hours
          );
          timerElements.minutes.textContent = formatTime(
            convertMs(differenceMc).minutes
          );
          timerElements.seconds.textContent = formatTime(
            convertMs(differenceMc).seconds
          );

          if (input.classList.contains('active')) {
            clearInterval(timerId);
            startBtn.disabled = false;
          }
          if (differenceMc < 1000) {
            clearInterval(timerId);
          }
        }, 1000);
      });
    },
  })
);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function formatTime(value) {
  return value.toString().padStart(2, '0');
}
