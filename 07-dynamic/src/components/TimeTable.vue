<script setup lang="ts">
const { data, columns } = defineProps<{
  data: any[];
  columns: Record<string, { label: string }>;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in Object.values(columns)" :key="column.label">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="column in Object.keys(columns)" :key="column">
          <slot :name="`td(${column})`" v-bind="{ row, value: row[column] }">
            {{ row[column] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000;
}
</style>
