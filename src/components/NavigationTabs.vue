<script setup lang="ts">
import { HEADER_HEIGHT } from '@/config/cssVariables';
</script>

<template>
  <v-tabs bg-color="primary" :height="HEADER_HEIGHT">
    <slot />
  </v-tabs>
</template>
