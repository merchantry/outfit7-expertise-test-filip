<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProjectGeneralView from '@/components/ProjectGeneralView.vue';
import ProjectEventsView from './ProjectEventsView.vue';
import { useRouteParam } from '@/hooks/general';
import { isNewRoute } from '@/utils/routes';
import NavigationTabs from '@/components/NavigationTabs.vue';
import NavigationTab from '@/components/NavigationTab.vue';
import { HEADER_HEIGHT } from '@/config/cssVariables';

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
    <div :style="{ minHeight: `${HEADER_HEIGHT}px` }">
      <NavigationTabs v-if="projectId && !isNewProject">
        <NavigationTab
          :to="{
            name: 'project-details',
            params: { projectId },
          }"
        >
          Project Settings
        </NavigationTab>
        <NavigationTab
          :to="
            eventId && !isNewEvent
              ? {
                  name: 'project-event-details',
                  params: {
                    projectId,
                    eventId,
                  },
                }
              : {
                  name: 'project-events',
                  params: { projectId },
                }
          "
        >
          Events
        </NavigationTab>
        <NavigationTab
          v-if="eventId && !isNewEvent"
          :to="{
            name: 'project-event-logs',
            params: { projectId, eventId },
          }"
        >
          Event Logs
        </NavigationTab>
      </NavigationTabs>
    </div>
    <component :is="Component" />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;

  width: 100%;

  & > .navigation-container {
    min-height: 73px;
  }

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
