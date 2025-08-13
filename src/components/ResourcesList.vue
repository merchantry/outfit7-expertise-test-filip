<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  title?: string;
  data: unknown[];
  getItemLink: (item: unknown) => string;
  newItemLink?: string;
}>();
</script>

<template>
  <div class="list-container">
    <v-list>
      <v-list-subheader v-if="props.title">{{ props.title }}</v-list-subheader>
      <v-list-item
        v-if="props.newItemLink"
        class="list-item list-item-new"
        append-icon="mdi-plus"
        :to="props.newItemLink"
      >
        <v-list-item-title>Create New</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="item in props.data"
        :key="item.id"
        :to="props.getItemLink(item)"
        class="list-item"
      >
        <slot name="item" :item="item"> </slot>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped lang="scss">
.v-list {
  width: 300px;
  height: calc(100vh - 73px);

  border-right: 1px solid #1867c0;

  overflow-y: auto;

  & .list-item {
    text-align: left;

    &.list-item-new {
      color: #1867c0;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
