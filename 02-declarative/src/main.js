import './assets/main.css'
import { ref, watchEffect } from 'vue'
import { shuffle } from 'lodash'
import morphdom from 'morphdom'

const size = 60;

const addButton = document.querySelector('button#add');
const resetButton = document.querySelector('button#reset');
const existingContainer = document.querySelector('div#colors');
const shuffleButton = document.querySelector('button#shuffle');

const colors = ref([
  {r: 255, g: 0, b: 0},
  {r: 0, g: 255, b: 0},
  {r: 0, g: 0, b: 255},
])

watchEffect(() => {
  const container = document.createElement('div');
  container.id = 'colors'

  colors.value.map((color, index) => {
    const colorVar = `rgb(${color.r}, ${color.g}, ${color.b})`
    const colorItem = document.createElement('div');
    colorItem.classList.add('color-item');
    colorItem.id = colorVar
    colorItem.style.backgroundColor = colorVar;
    colorItem.style.borderColor = `rgb(${color.r * 0.8}, ${color.g * 0.8}, ${color.b * 0.8})`;
    container.appendChild(colorItem);
    colorItem.style.transform = `translateX(${size * index}px)`;

    return colorItem;
  })
    .sort((n1, n2) => n1.id > n2.id ? 1 : -1)
    .forEach((colorItem, index) => {
      container.appendChild(colorItem)
    })

  morphdom(existingContainer, container);
})

addButton.addEventListener('click', () => {
  colors.value.push({
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  })
})

resetButton.addEventListener('click', () => {
  colors.value = [];
})

shuffleButton.addEventListener('click', () => {
  colors.value = shuffle(colors.value);
})
