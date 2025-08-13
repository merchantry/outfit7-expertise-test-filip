<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  errorButton?: boolean;
  color?: string;
  variant?: string;
  icon?: string;
}>();
</script>

<template>
  <v-btn
    :color="props.errorButton ? 'error' : props.color"
    :variant="props.errorButton ? 'outlined' : props.variant"
    :icon="props.icon"
  >
    <v-icon v-if="props.icon" :icon="props.icon"></v-icon>
    <slot></slot>
  </v-btn>
</template>
