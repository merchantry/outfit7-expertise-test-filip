import { RouteRecordRaw } from 'vue-router';
import ProjectsView from '@/views/ProjectsView.vue';
import NotFound from '@/views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    children: [
      {
        path: ':projectId',
        name: 'project-details',
        component: ProjectsView,
        children: [
          {
            path: 'events',
            name: 'project-events',
            component: ProjectsView,
            children: [
              {
                path: ':eventId',
                name: 'project-event-details',
                component: ProjectsView,
                children: [
                  {
                    path: 'logs',
                    name: 'project-event-logs',
                    component: ProjectsView,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
];

export default routes;
