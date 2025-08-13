import { Project } from '@/types';

export function newProject(): Project {
  return {
    id: 'new',
    name: '',
    apiKey: '',
    updateIntervalSeconds: '30',
  };
}
