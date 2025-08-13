<template>
  <v-card>
    <slot />
  </v-card>
</template>

<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: min-content;

  margin-top: 20px;
  padding: 20px;
}
</style>
