import { ClassMap, IdMap, MatchData, PartialMatchData } from '../types';
import { getElementUniqueKey } from './dom';

class MatchingElementsStorage {
  matches: Record<string, MatchData>;

  constructor(
    private idMap: IdMap,
    private classMap: ClassMap,
    private timestamp: number,
    private url: string,
    private sessionId: string
  ) {
    this.matches = {};
  }

  get matchesArray(): MatchData[] {
    return Object.values(this.matches);
  }

  private isElementAdded(key: string): boolean {
    return key in this.matches;
  }

  private addIfNotExists(matchData: MatchData): void {
    if (this.isElementAdded(matchData.key)) return;

    this.matches[matchData.key] = matchData;
  }

  private createPartialMatchData(element: Element): PartialMatchData {
    return {
      key: getElementUniqueKey(element),
      timestamp: this.timestamp,
      url: this.url,
      sessionId: this.sessionId,
    };
  }

  private createIdMatchData(element: Element): MatchData {
    return {
      ...this.createPartialMatchData(element),
      matchType: 'id',
      eventId: this.idMap[element.id],
    };
  }

  private createClassMatchData(element: Element): MatchData {
    return {
      ...this.createPartialMatchData(element),
      matchType: 'class',
      eventId: this.classMap[element.className],
    };
  }

  addIdMatches(element: Element): this {
    const id = element.id;
    if (!id || !(id in this.idMap)) return this;

    this.addIfNotExists(this.createIdMatchData(element));
    return this;
  }

  addClassMatches(element: Element): this {
    if (!element.classList || !element.classList.length) return this;
    for (const className of Array.from(element.classList)) {
      if (!(className in this.classMap)) continue;
      this.addIfNotExists(this.createClassMatchData(element));
    }
    return this;
  }
}

export default MatchingElementsStorage;
