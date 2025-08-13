<script setup lang="ts">
import { computed } from 'vue';
import { Event } from '@/types';
import { getEvents } from '@/api/routes/events';
import { useQuery, useRouteParam } from '@/hooks/general';
import ProjectEventDetailsView from '@/components/ProjectEventDetailsView.vue';
import ResourcesList from '@/components/ResourcesList.vue';
import ResourcesListItemTitle from '@/components/ResourcesList/ResourcesListItemTitle.vue';
import ResourcesListItemSubtitle from '@/components/ResourcesList/ResourceListItemSubtitle.vue';
import { useRoute } from 'vue-router';
import EventLogsDataTable from '@/components/EventLogsDataTable.vue';

const route = useRoute();

const projectId = useRouteParam('projectId');
const eventId = useRouteParam('eventId');

const page = computed(() => {
  if (route.path.includes('/logs')) return 'project-event-logs';
  if (route.path.includes('/events')) return 'project-events';

  return 'project-details';
});

const {
  data: events,
  isLoading: isLoadingEvents,
  refetch,
} = useQuery<Event[]>(() => {
  if (!projectId.value) return [];
  return getEvents(projectId.value);
});
</script>

<template>
  <div v-if="events && !isLoadingEvents" class="container">
    <ResourcesList
      title="Events"
      :data="events"
      :getItemLink="(item: Event) => {

        if (page === 'project-event-logs') return `/projects/${projectId}/events/${item.id}/logs`;

        return `/projects/${projectId}/events/${item.id}`;
      }"
      :newItemLink="`/projects/${projectId}/events/new`"
    >
      <template #item="{ item }">
        <ResourcesListItemTitle>{{ item.name }}</ResourcesListItemTitle>
        <ResourcesListItemSubtitle>{{
          item.description
        }}</ResourcesListItemSubtitle>
        <ResourcesListItemSubtitle
          >Priority: {{ item.priority }}</ResourcesListItemSubtitle
        >
      </template>
    </ResourcesList>
    <ProjectEventDetailsView
      v-if="projectId && eventId && page === 'project-events'"
      :eventId="eventId"
      :projectId="projectId"
      @update="refetch"
    />
    <EventLogsDataTable
      v-if="projectId && eventId && page === 'project-event-logs'"
      :projectId="projectId"
      :eventId="eventId"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;

  display: flex;
  gap: 20px;
}
</style>
