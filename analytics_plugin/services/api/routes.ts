import api from './api';
import { Event, MatchData, Project } from '../../types';

export async function fetchEvents(projectId: string): Promise<Event[]> {
  return api.fetch<Event[]>(`projects/${projectId}/events`);
}

export async function fetchProjectData(
  apiKey: string
): Promise<Project | undefined> {
  return api.fetch<Project>(`projects/by-api-key/${apiKey}`);
}

export async function saveEventsToServer(
  events: MatchData[]
): Promise<boolean> {
  const result = await api.post<{ count: number }, MatchData[]>('logs', events);
  console.log(`Sent ${events.length} events to the server`, result);

  return result.count === events.length;
}
