import { debounce, randomUUID } from './utils/helpers';
import { ClassMap, IdMap, MatchData, Project } from './types';
import { getApiKeyFromScriptTag } from './utils/scriptElement';
import { fetchEvents, fetchProjectData } from './services/api/routes';
import { addEventsToLocalStorage } from './services/localStorage/events';
import findMatchingElements from './utils/findMatchingElements';
import flushEventsToServerPeriodically from './services/localStorage/flushEventsToServerPeriodically';
import createIdMap from './utils/createIdMap';
import createClassListMap from './utils/createClassListMap';

const idMap: IdMap = {};
const classMap: ClassMap = {};
const projectData: Partial<Project> = {};
const matchesTempStorage: MatchData[] = [];

const sessionId = randomUUID();

const saveMatchesToLocalStorage = debounce(() => {
  if (!matchesTempStorage.length) return;
  addEventsToLocalStorage(matchesTempStorage);
  matchesTempStorage.length = 0;
}, 500);

async function initialize() {
  const apiKey = getApiKeyFromScriptTag();

  if (!apiKey) {
    console.error('API key not found in script tag');
    return;
  }
  Object.assign(projectData, await fetchProjectData(apiKey));

  if (!projectData?.id) {
    console.error('Project not found for the given API key');
    return;
  }

  const events = await fetchEvents(projectData.id);

  Object.assign(idMap, createIdMap(events));
  Object.assign(classMap, createClassListMap(events));

  flushEventsToServerPeriodically(
    Number(projectData.updateIntervalSeconds || 60) * 1000
  );
}

initialize().catch(error => {
  console.error('Initialization failed:', error);
});

window.addEventListener('click', e => {
  if (!e.target || !(e.target instanceof Element)) return;

  const matches = findMatchingElements(
    e.target,
    idMap,
    classMap,
    Date.now(),
    window.location.href,
    sessionId
  );
  if (!matches.length) return;

  matchesTempStorage.push(...matches);

  saveMatchesToLocalStorage();
});
