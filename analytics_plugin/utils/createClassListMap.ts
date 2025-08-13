import { ClassMap, Event } from '../types';

export default function createClassListMap(events: Event[]): ClassMap {
  const classMap: ClassMap = {};

  for (const event of events) {
    for (const tag of event.tags) {
      if (!tag.startsWith('.')) continue;

      classMap[tag.slice(1)] = event.id;
    }
  }

  return classMap;
}
