import { Event, IdMap } from '../types';

export default function createIdMap(events: Event[]): IdMap {
  const idMap: IdMap = {};

  for (const event of events) {
    for (const tag of event.tags) {
      if (!tag.startsWith('#')) continue;

      idMap[tag.slice(1)] = event.id;
    }
  }

  return idMap;
}
