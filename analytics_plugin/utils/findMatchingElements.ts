import { ClassMap, IdMap, MatchData } from '../types';
import { traverseParents } from './dom';
import MatchingElementsStorage from './MatchingElementsStorage';

function findMatchingElements(
  target: Element,
  idMap: IdMap,
  classMap: ClassMap,
  timestamp: number,
  url: string,
  sessionId: string
): MatchData[] {
  const matchingElementsStorage = new MatchingElementsStorage(
    idMap,
    classMap,
    timestamp,
    url,
    sessionId
  );

  traverseParents(target, (el: Element) => {
    matchingElementsStorage.addIdMatches(el).addClassMatches(el);
  });

  return matchingElementsStorage.matchesArray;
}

export default findMatchingElements;
