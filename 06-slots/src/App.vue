<script setup lang="ts">
import MyDetails from "./components/MyDetails.vue";
</script>

<template>
  <div>
    <MyDetails>
      <template #title="{ isOpen, toggle }">
        <button @click="toggle">{{ isOpen ? "-" : "+" }}</button>
        <span>Details</span>
      </template>
      <template #default="{ isOpen }">
        <p>Details content {{ isOpen }}</p>
      </template>
    </MyDetails>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f4f7f9;
  height: 100vh;
  padding: 20px;
}
</style>
