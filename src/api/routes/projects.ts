import { Project } from '@/types';
import api from '../api';

export async function getProjects() {
  return api.get<Project[]>('projects');
}

export async function getProjectById(projectId: string) {
  return api.get<Project>(`projects/${projectId}`);
}

export async function createProject(project: Omit<Project, 'id'>) {
  return api.post<Project>('projects', project);
}

export async function updateProject(
  projectId: string,
  project: Partial<Project>
) {
  return api.patch<Project>(`projects/${projectId}`, project);
}

export async function deleteProject(projectId: string) {
  return api.delete(`projects/${projectId}`);
}
