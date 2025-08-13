import { EventLog } from '@/types';
import api from '../api';

export async function getEventLogs(
  projectId: string,
  eventId: string,
  offset: number,
  limit: number,
  sortOrder: 'asc' | 'desc' = 'desc',
  sortBy: keyof EventLog = 'timestamp'
) {
  return api.get<{ data: EventLog[]; totalRows: number }>(
    `projects/${projectId}/events/${eventId}/logs`,
    {
      offset,
      limit,
      sortOrder,
      sortBy,
    }
  );
}
