<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  closable: boolean;
  data: string[];
  getChipColor: (chip: string) => string;
}>();

const emit = defineEmits<{
  (e: 'delete', value: number): void;
}>();
</script>

<template>
  <div class="chips-list">
    <v-chip
      v-for="(chip, index) in props.data"
      :key="index"
      :color="getChipColor(chip)"
      closable
      variant="elevated"
      @click:close="emit('delete', index)"
    >
      {{ chip }}
    </v-chip>
    <span class="no-tags" v-if="props.data.length === 0"><slot /></span>
  </div>
</template>

<style scoped lang="scss">
.chips-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  & > .no-tags {
    color: rgb(168, 93, 93);
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
