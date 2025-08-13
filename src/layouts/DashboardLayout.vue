<script setup lang="ts">
import ProjectsList from '@/components/ProjectsList.vue';
import { getProjects } from '@/api/routes/projects';
import { useQuery, useRouteParam } from '@/hooks/general';
import { Project } from '@/types';
import eventBus from '@/services/eventBus';

const projectId = useRouteParam('projectId');

const { data: projects, refetch } = useQuery<Project[]>(() => getProjects());

eventBus.on('projects-updated', () => refetch());
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="title">
        <router-link to="/projects/new">
          <img src="@/assets/logo.png" alt="Logo" width="170" />
        </router-link>
      </div>
      <ProjectsList
        class="projects-list"
        v-if="projects"
        :projectId="projectId"
        :projects="projects"
      />
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
div.container {
  z-index: 1;
  position: relative;
  display: flex;

  background: #fcfcfc;
  height: 100vh;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 73px;
    background: #1867c0;
    z-index: 0;
  }

  & > .sidebar {
    z-index: 1;

    display: flex;
    flex-direction: column;

    & > .title {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 73px;

      & > a {
        display: flex
      }
    }

    & > .projects-list {
      flex: 1;
    }
  }
}
</style>
