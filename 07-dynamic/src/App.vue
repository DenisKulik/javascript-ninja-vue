<script setup lang="ts">
import { ref, computed, watch } from "vue";
import TimeTable from "./components/TimeTable.vue";
import AppDashboard from "./components/AppDashboard.vue";

const mode = ref("lte");
const limit = ref(15);
const target = ref(15);

const updateTarget = () => {
  if (mode.value === "lte" && target.value > limit.value) {
    target.value = limit.value;
  } else if (mode.value === "gte" && target.value < limit.value) {
    target.value = limit.value;
  }
};

const limitField = computed(() => (mode.value === "lte" ? "max" : "min"));

const data = ref([
  { from: "Kemerovo", to: "Novosibirsk", price: 1000 },
  { from: "Novosibirsk", to: "Moscow", price: 3000 },
  { from: "Moscow", to: "Kemerovo", price: 3500 },
  { from: "Kemerovo", to: "Moscow", price: 3500 },
]);

const columns = {
  from: { label: "From" },
  to: { label: "To" },
  price: { label: "Price" },
};

const dashboardConfig = [
  {
    id: "filters",
    gridAttributes: {
      width: 2,
      height: 1,
      yPos: 0,
      xPos: 3,
    },
  },
  {
    id: "info",
    gridAttributes: {
      width: 1,
      height: 2,
      yPos: 1,
      xPos: 0,
    },
  },
  {
    id: "chart",
    gridAttributes: {
      width: 3,
      height: 2,
      yPos: 1,
      xPos: 1,
    },
  },
] as const;

watch(mode, updateTarget);
watch(limit, updateTarget);
</script>

<template>
  <select v-model="mode">
    <option value="lte">Less than or equal to</option>
    <option value="gte">Greater than or equal to</option>
  </select>
  <input type="number" value="15" v-model="limit" />
  <hr />
  Target value:
  <input type="number" value="15" v-model="target" :[limitField]="limit" />
  <hr />
  <TimeTable :data="data" :columns="columns">
    <template #td(price)="{ value }">
      {{ Math.floor(value / 100) }}.{{ value % 100 }}
    </template>
  </TimeTable>
  <hr />
  <AppDashboard :config="dashboardConfig">
    <template #panel(filters)> My custom filters </template>
    <template #panel(info)> My custom info </template>
    <template #panel(chart)> My custom chart </template>
  </AppDashboard>
</template>
