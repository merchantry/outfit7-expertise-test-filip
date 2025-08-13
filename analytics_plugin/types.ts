export type IdMap = Record<string, string>;
export type ClassMap = Record<string, string>;
export type Project = {
  id: string;
  name: string;
  apiKey: string;
  updateIntervalSeconds: string;
};

export type PartialMatchData = {
  key: string;
  timestamp: number;
  url: string;
  sessionId: string;
};

export type MatchData = PartialMatchData & {
  matchType: 'id' | 'class';
  eventId: string;
};

export type EventType = 'crosspromo' | 'liveops' | 'app' | 'ads';

export interface Event {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: string;
  type: EventType;
  tags: string[];
}
