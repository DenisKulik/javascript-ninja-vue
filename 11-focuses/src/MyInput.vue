<script setup>
import { useTemplateRef } from 'vue';
const input = useTemplateRef('input')
defineExpose({
  focus() {
    input.value.focus();
  }
})
</script>

<template>
  <input ref="input"></input>
  <div class="error"></div>
</template>
