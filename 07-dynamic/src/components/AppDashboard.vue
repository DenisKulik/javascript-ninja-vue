<script setup lang="ts" generic="PanelNames extends string">
import { computed } from "vue";

const { config } = defineProps<{
  config: readonly {
    id: PanelNames;
    gridAttributes: {
      width: number;
      height: number;
      xPos: number;
      yPos: number;
    };
  }[];
}>();

type PanelSlotNames = `panel(${PanelNames})`;

defineSlots<{
  [key in PanelSlotNames]: () => unknown;
}>();

const gridColumns = computed(() => {
  const maxWidth = Math.max(
    ...config.map(
      (entry) => entry.gridAttributes.xPos + entry.gridAttributes.width
    )
  );
  return `repeat(${maxWidth}, 1fr)`;
});

const gridRows = computed(() => {
  const maxHeight = Math.max(
    ...config.map(
      (entry) => entry.gridAttributes.yPos + entry.gridAttributes.height
    )
  );
  return `repeat(${maxHeight}, minmax(40px, auto))`;
});

const getGridStyle = (entry: any) => {
  const { xPos, yPos, width, height } = entry.gridAttributes;
  return {
    gridColumn: `${xPos + 1} / span ${width}`,
    gridRow: `${yPos + 1} / span ${height}`,
  };
};
</script>

<template>
  <div class="grid">
    <div
      v-for="entry in config"
      :key="entry.id"
      class="panel"
      :style="getGridStyle(entry)"
    >
      <slot :name="`panel(${entry.id})`"></slot>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  grid-template-rows: v-bind(gridRows);
  gap: 5px;
  width: 100%;
}

.panel {
  min-height: 10px;
  border: 1px solid black;
}
</style>
