<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { Project } from '@/types';
import ResourcesList from './ResourcesList.vue';
import ResourcesListItemTitle from './ResourcesList/ResourcesListItemTitle.vue';

const props = defineProps<{
  projectId: string | undefined;
  projects: Project[];
}>();

const route = useRoute();

function getProjectLink(project: Project) {
  const isInEventsRoute = route.path.includes('/events');

  if (isInEventsRoute) return `/projects/${project.id}/events`;

  return `/projects/${project.id}`;
}
</script>

<template>
  <ResourcesList
    title="Projects"
    :data="props.projects"
    :getItemLink="getProjectLink"
    :newItemLink="`/projects/new`"
  >
    <template #item="{ item }">
      <ResourcesListItemTitle>{{ item.name }}</ResourcesListItemTitle>
    </template>
  </ResourcesList>
</template>
