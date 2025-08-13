<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery, useRouteParam } from '@/hooks/general';
import { Project } from '@/types';
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject as _deleteProject,
} from '@/api/routes/projects';
import { getScriptElement } from '@/utils/projectScriptElement';
import { newProject } from '@/utils/projects';
import { isNewRoute } from '@/utils/routes';
import eventBus from '@/services/eventBus';
import CodeSnippet from './CodeSnippet.vue';
import TextInput from './InputElements/TextInput.vue';
import SelectInput from './InputElements/SelectInput.vue';
import BaseCard from './BaseCard.vue';
import BaseCardActions from './BaseCardActions.vue';
import BaseButton from './BaseButton.vue';
import SubtitleNote from './SubtitleNote.vue';

const projectId = useRouteParam('projectId');

const router = useRouter();

const isNewProject = computed(() => isNewRoute(projectId.value));

const { data: project, isLoading } = useQuery<Project | undefined>(() => {
  if (isNewProject.value || !projectId.value) return newProject();

  return getProjectById(projectId.value);
});

const scriptTag = computed(() => getScriptElement(project.value?.apiKey || ''));

async function saveProject() {
  if (!project.value) return;

  if (!isNewProject.value && projectId.value) {
    project.value = await updateProject(projectId.value, project.value);
  } else {
    project.value = await createProject(project.value);

    router.push({
      name: 'project-details',
      params: { projectId: project.value.id },
    });
  }

  eventBus.emit('projects-updated');
}

async function deleteProject() {
  if (isNewProject.value || !projectId.value) return;

  await _deleteProject(projectId.value);
  router.push('/projects/new');

  eventBus.emit('projects-updated');
}
</script>

<template>
  <section v-if="project && !isLoading">
    <BaseCard class="form-container">
      <SubtitleNote>{{
        isNewProject ? 'New Project' : `Project ID:  ${projectId}`
      }}</SubtitleNote>
      <TextInput label="Project Name" v-model="project.name" required />

      <SelectInput
        v-model="project.updateIntervalSeconds"
        :items="['5', '10', '15', '30', '60', '120', '300']"
        label="Update Interval (seconds)"
      />
      <BaseCardActions>
        <BaseButton v-if="!isNewProject" @click="deleteProject" errorButton>
          Delete Project
        </BaseButton>
        <BaseButton color="primary" @click="saveProject">
          Save Project
        </BaseButton></BaseCardActions
      >
      <CodeSnippet
        v-if="project.apiKey"
        title="Script Tag"
        :content="scriptTag"
      />
    </BaseCard>
  </section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 600px;

  padding: 20px;

  & > * {
    flex-grow: 0;
  }

  & > .form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > small {
      text-align: left;
    }
  }
}
</style>
