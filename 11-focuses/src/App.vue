<script setup>
import { useTemplateRef, watch } from "vue";
import MyInput from "./MyInput.vue";
import { useIdUpload } from "./useIdUpload";

const extraName = useTemplateRef("extraName");

const { isLoading, isIdProvided, isExtraSpellingNeeded, upload } =
  useIdUpload();

const focusIfNeeded = () => {
  if (isExtraSpellingNeeded.value) {
    extraName.value.focus();
  }
};
</script>

<template>
  <h1>Identification</h1>
  <button :disabled="isLoading" @click="upload">
    <template v-if="!isLoading">Provide ID</template>
    <template v-else>Loading...</template>
  </button>
  <p v-if="isIdProvided && !isLoading">
    <label
      >Provide your name in English<span
        v-if="isExtraSpellingNeeded"
        class="required"
      >
        (required)</span
      >:
    </label>
    <MyInput @vue:mounted="focusIfNeeded" ref="extraName" />
  </p>
</template>

<style>
.required {
  color: red;
}
</style>
