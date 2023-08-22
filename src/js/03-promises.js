import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

elements.form.addEventListener('submit', evt => {
  evt.preventDefault();

  let delayVal = Number(elements.delay.value);
  const stepVal = Number(elements.step.value);
  const amountVal = Number(elements.amount.value);

  for (let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delayVal);
    delayVal = delayVal + stepVal;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(` Fulfilled promise ${position} in ${delay}ms`, {
        delay: 6000,
        cssAnimationStyle: 'from-top',
      });
    })
    .catch(({ position, delay }) => {
      Notify.failure(` Rejected promise ${position} in ${delay}ms`, {
        delay: 6000,
        cssAnimationStyle: 'from-top',
      });
    });
}
