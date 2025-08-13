import { Event } from '@/types';
import api from '../api';

export async function getEvents(projectId: string) {
  return api.get<Event[]>(`projects/${projectId}/events`);
}

export async function getEventById(projectId: string, eventId: string) {
  return api.get<Event>(`projects/${projectId}/events/${eventId}`);
}

export async function createEvent(projectId: string, event: Omit<Event, 'id'>) {
  return api.post<Event>(`projects/${projectId}/events`, event);
}

export async function updateEvent(
  projectId: string,
  eventId: string,
  event: Partial<Event>
) {
  return api.patch<Event>(`projects/${projectId}/events/${eventId}`, event);
}

export async function deleteEvent(projectId: string, eventId: string) {
  return api.delete(`projects/${projectId}/events/${eventId}`);
}
