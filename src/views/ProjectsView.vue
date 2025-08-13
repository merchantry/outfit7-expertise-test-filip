<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProjectGeneralView from '@/components/ProjectGeneralView.vue';
import ProjectEventsView from './ProjectEventsView.vue';
import { useRouteParam } from '@/hooks/general';
import { isNewRoute } from '@/utils/routes';

const route = useRoute();
const projectId = useRouteParam('projectId');
const eventId = useRouteParam('eventId');

const isNewProject = computed(() => isNewRoute(projectId.value));
const isNewEvent = computed(() => isNewRoute(eventId.value));
const page = computed(() => {
  if (route.path.includes('/logs')) return 'project-event-logs';
  if (route.path.includes('/events')) return 'project-events';

  return 'project-details';
});
const Component = computed(() => {
  switch (page.value) {
    case 'project-details':
      return ProjectGeneralView;
    case 'project-event-logs':
    case 'project-events':
      return ProjectEventsView;
    default:
      return null;
  }
});
</script>

<template>
  <main>
    <v-tabs
      v-if="projectId && !isNewProject"
      class="navigation"
      bg-color="primary"
      height="73"
    >
      <v-tab
        :to="{
          name: 'project-details',
          params: { projectId },
        }"
        >Project Settings</v-tab
      >
      <v-tab
        :to="
          eventId && !isNewEvent
            ? {
                name: 'project-event-details',
                params: { projectId, eventId },
              }
            : {
                name: 'project-events',
                params: { projectId },
              }
        "
        >Events</v-tab
      >
      <v-tab
        v-if="eventId && !isNewEvent"
        :to="{
          name: 'project-event-logs',
          params: { projectId, eventId },
        }"
        >Event Logs</v-tab
      >
    </v-tabs>
    <div v-else class="spacer"></div>
    <component :is="Component" />
  </main>
</template>

<style scoped lang="scss">
.spacer {
  height: 73px;
}
main {
  display: flex;
  flex-direction: column;

  width: 100%;

  & > :nth-child(2) {
    flex: 1;
  }
}

h2 {
  text-align: left;
}

section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
