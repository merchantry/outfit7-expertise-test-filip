<script setup lang="ts">
import FlexColumns from './FlexColumns.vue';
</script>

<template>
  <FlexColumns class="base-card-actions">
    <slot />
  </FlexColumns>
</template>

<style scoped>
.base-card-actions {
  border-top: 1px solid #c3c3c3;
  margin-top: 12px;
  padding-top: 20px;
}
</style>
