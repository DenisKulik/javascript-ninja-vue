<script setup lang="ts">
import { ref, computed, useSlots } from "vue";

const isOpen = ref(false);
const slots = defineSlots<{
  default: (props: { isOpen: boolean }) => {};
  title: (props: { isOpen: boolean; toggle: () => void }) => {};
}>();
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const extraProps = computed(() =>
  slots.title
    ? {}
    : {
        role: "button",
        onClick: toggle,
      }
);
</script>

<template>
  <section class="details">
    <div class="title" v-bind="extraProps">
      <slot name="title" :isOpen :toggle></slot>
    </div>
    <div class="content" v-show="isOpen">
      <slot :isOpen>Default content</slot>
    </div>
  </section>
</template>

<style scoped>
.details {
  max-width: 300px;
  border: 1px solid #ccc;
}

.title {
  padding: 4px;
  cursor: pointer;
  background-color: lightgray;
}

.content {
  padding: 8px;
}
</style>
