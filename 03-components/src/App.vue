<script setup>
import { ref } from 'vue'
import { shuffle } from 'lodash'

import './assets/main.css'

const SIZE = 60

const colors = ref([
  { r: 255, g: 0, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 0, g: 0, b: 255 }
])

const addColor = () => {
  colors.value.push({
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  })
}

const resetColors = () => {
  colors.value = []
}

const shuffleColors = () => {
  colors.value = shuffle(colors.value)
}
</script>

<template>
  <div class="container">
    <div class="colors">
      <div v-for="(color, index) in colors" :key="color"
           :style="{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
           borderColor: `rgb(${color.r * 0.8}, ${color.g * 0.8}, ${color.b * 0.8})`,
           transform: `translateX(${index * SIZE}px)` }"
           class="color-item"
      >
      </div>
    </div>
    <button class="add" @click="addColor">add</button>
    <button class="reset" @click="resetColors">reset</button>
    <button class="shuffle" @click="shuffleColors">shuffle</button>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.colors {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: baseline;
  gap: 1px;
  width: 600px;
  min-height: 60px;
  margin-bottom: 1rem;
  border: 1px solid #2c3e50;
}

.color-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border: 1px solid;
  border-radius: 2px;
  transition: all 0.5s;
}
</style>