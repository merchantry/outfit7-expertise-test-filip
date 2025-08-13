<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import BaseCard from './BaseCard.vue';
import { useQuery } from '@/hooks/general';
import { EventLog } from '@/types';
import { getEventLogs } from '@/api/routes/eventLogs';
import { toHumanReadableTime } from '@/utils/date';
import { getElementHtmlFromKey } from '@/utils/logs';
import { useRoute, useRouter } from 'vue-router';
import { getRouteQuery } from '@/utils/routes';
import { cutString } from '@/utils/string';

const currentTimestamp = Date.now();

const props = defineProps<{
  projectId: string;
  eventId: string;
}>();

const route = useRoute();
const router = useRouter();

const pageNumber = computed<number, number>({
  get: () => Number(getRouteQuery(route, 'page')) || 1,
  set: value => {
    if (!value || value < 1) {
      delete route.query.page;
      return;
    }

    router.push({ query: { ...route.query, page: String(value) } });
  },
});
const itemsPerPage = ref<number>(10);

const { data: eventLogs, isLoading } = useQuery<{
  data: EventLog[];
  totalRows: number;
}>(async () => {
  if (!props.projectId || !props.eventId) return { data: [], totalRows: 0 };
  return getEventLogs(
    props.projectId,
    props.eventId,
    (pageNumber.value - 1) * itemsPerPage.value,
    itemsPerPage.value
  );
});
</script>

<template>
  <BaseCard
    v-if="props.projectId && props.eventId && !isLoading && eventLogs?.data"
  >
    <v-data-table-server
      v-model:page="pageNumber"
      :headers="[
        { title: 'Time', value: 'timestamp' },
        { title: 'URL', value: 'url' },
        { title: 'HTML Element', value: 'key' },
      ]"
      :items="eventLogs.data"
      :items-length="eventLogs.totalRows"
      :loading="isLoading"
      item-value="id"
    >
      <template #item="{ item }">
        <tr>
          <td>
            {{ toHumanReadableTime(currentTimestamp - Number(item.timestamp)) }}
            ago
          </td>
          <td :title="item.url">
            {{ cutString(item.url, 50) }}
          </td>
          <td :title="getElementHtmlFromKey(item.key)">
            {{ cutString(getElementHtmlFromKey(item.key), 50) }}
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </BaseCard>
</template>

<style lang="scss">
.v-data-table-footer__items-per-page {
  display: none !important;
}
</style>
