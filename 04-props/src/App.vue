<script setup lang="ts">
import { ref } from 'vue'
import Number from '@/components/DisplayNumber.vue'

const count = ref<number>(0)
</script>

<template>
  <Number :count class="foo" />
  <button @click="count++">+</button>
  <button @click="count--">-</button>
</template>