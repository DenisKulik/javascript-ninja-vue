<script setup lang="ts">
import { watch, useAttrs } from 'vue'

const { count = 0 } = defineProps<{
  count?: number
}>()

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()

watch(() => count, (newValue, oldValue) => {
  if (oldValue < 10 && newValue >= 10) {
    console.log('10이상')
  }
})
</script>

<template>
  <div class="wrapper">
    <h3>Current value</h3>
    <div :style="{
      fontSize: Math.max(count * 5, 5) + 'px'
    }" v-bind="attrs">
      {{ count }}
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 1px solid #000;
}
.foo {
  color: red
}
</style>