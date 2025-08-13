<template>
  <div class="flex-columns">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.flex-columns {
  display: flex;
  gap: 20px;

  width: 100%;

  & > * {
    flex: 1;
  }
}
</style>
