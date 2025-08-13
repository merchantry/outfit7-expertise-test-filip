import { Event } from '@/types';

export function newEvent(projectId: string): Event {
  return {
    id: 'new',
    projectId,
    name: '',
    description: '',
    priority: '0',
    type: 'crosspromo',
    tags: [],
  };
}

export function getChipColor(tag: string): string {
  if (tag.startsWith('.')) return 'orange';
  if (tag.startsWith('#')) return 'blue';

  return 'grey';
}
