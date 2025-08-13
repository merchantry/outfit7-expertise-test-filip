<script lang="ts" setup>
import { useDebouncedCallback } from '@/hooks/general';
import { defineProps, ref } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  title: string;
  content: string;
}>();

const copied = ref(false);

const refreshCopiedValue = useDebouncedCallback(() => {
  copied.value = false;
}, 2000);

function copyContent() {
  navigator.clipboard.writeText(props.content);
  copied.value = true;

  refreshCopiedValue();
}
</script>

<template>
  <div class="container">
    <div class="code-snippet">
      <div class="header">
        <span> {{ props.title }}</span>
        <BaseButton
          size="x-small"
          variant="outlined"
          :icon="copied ? 'mdi-check' : 'mdi-content-copy'"
          @click="copyContent"
        />
      </div>
      <v-divider></v-divider>
      <pre>{{ props.content }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  text-align: left;

  & > .code-snippet {
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 10px 15px;

    background: #32302f;
    color: white;
    border-radius: 5px;

    & > .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 5px;

      & > span {
        font-size: 0.9rem;
      }

      & > .v-btn {
        border-radius: 5px;
      }
    }

    & > pre {
      text-wrap: wrap;
      word-break: break-all;
    }
  }
}
</style>
