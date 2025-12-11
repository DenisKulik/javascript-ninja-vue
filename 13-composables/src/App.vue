<script setup lang="ts">
import { ref, reactive } from "vue";
import { useLocalStorageValue } from "./useLocalStorageValue";

const storageKey = ref("my-value");
const options = ref({
  syncTabs: true,
});

const random = () => Math.floor(Math.random() * 100);

const { value: randomValue } = useLocalStorageValue(
  storageKey,
  random(),
  options
);
</script>

<template>
  <h1>Random value persister</h1>
  <h2>{{ randomValue }}</h2>
  <p>Key: <input v-model="storageKey" /></p>
  <p>Sync tabs: <input type="checkbox" v-model="options.syncTabs" /></p>
  <button @click="randomValue = random()">Generate!</button>
</template>

<style scoped></style>
