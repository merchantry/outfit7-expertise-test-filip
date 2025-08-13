import { getLocalStorage, setLocalStorage } from './index';
import { MatchData } from '../../types';
import { LOCAL_STORAGE_KEY } from '../../config';

export function getEventsFromLocalStorage(): MatchData[] {
  return getLocalStorage<MatchData[]>(LOCAL_STORAGE_KEY) ?? [];
}

export function addEventsToLocalStorage(events: MatchData[]): void {
  const existingEvents = getLocalStorage<MatchData[]>(LOCAL_STORAGE_KEY);
  const updatedEvents = [...(existingEvents ?? []), ...events];

  setLocalStorage(LOCAL_STORAGE_KEY, updatedEvents);
}

export function clearEventsFromLocalStorage(): void {
  setLocalStorage<MatchData[]>(LOCAL_STORAGE_KEY, []);
}
