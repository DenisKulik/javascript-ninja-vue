const counterButton = document.querySelector('button#counter');
const resetButton = document.querySelector('button#reset');

// Vue 2 reactive state
// const counterState = {
//   _value: 5,
//
//   get value() {
//     return this._value;
//   },
//
//   set value(value) {
//     this._value = value;
//     renderCounter();
//   },
// }

// Vue 3 reactive state
const counterState = new Proxy(
  {
    value: 5
  },
  {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        return prop;
      }
    },
    set(target, prop, value) {
      if (prop in target) {
        target[prop] = value;
        renderCounter();
        return true;
      } else {
        return false;
      }
    }
  }
);

function renderCounter() {
  counterButton.textContent = `Clicks: ${counterState.value}`;
  counterButton.classList.toggle('red', isCounterTooBig());
}

function isCounterTooBig() {
  return counterState.value > 10;
}

counterButton.addEventListener('click', () => {
  counterState.value++;
});

resetButton.addEventListener('click', () => {
  counterState.value = 0;
});