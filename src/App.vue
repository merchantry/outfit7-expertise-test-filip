<script setup lang="ts">
import DashboardLayout from './layouts/DashboardLayout.vue';
import ContextProvider from './context/ContextProvider.vue';
</script>

<template>
  <ContextProvider>
    <DashboardLayout>
      <router-view />
    </DashboardLayout>
  </ContextProvider>
</template>
