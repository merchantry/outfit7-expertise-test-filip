export interface Project {
  id: string;
  name: string;
  apiKey: string;
  updateIntervalSeconds: string;
}

export type Action =
  | 'click'
  | 'dblclick'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove';

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

export interface EventLog {
  id: string;
  key: string;
  timestamp: number;
  url: string;
  sessionId: string;
  matchType: 'id' | 'class';
  eventId: string;
}

export interface IpData {
  ip: string;
  countryCode: string;
  adsPermission: boolean;
}
