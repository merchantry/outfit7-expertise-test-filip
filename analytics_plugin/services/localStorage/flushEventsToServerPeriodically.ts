import { retryUntilSuccessful } from '../../utils/promise';
import { saveEventsToServer } from '../api/routes';
import {
  clearEventsFromLocalStorage,
  getEventsFromLocalStorage,
} from './events';

async function flushEventsToServerPeriodically(
  interval: number
): Promise<void> {
  let retryInProgress = false;

  setInterval(async () => {
    if (retryInProgress) return;

    const success = await retryUntilSuccessful(
      () => {
        const events = getEventsFromLocalStorage();
        if (!events || !events.length) return Promise.resolve(false);

        return saveEventsToServer(events);
      },
      [5000, 10000, 15000, 20000, 30000],
      error => {
        console.error(
          'Error occurred while persisting events, trying again...',
          error
        );
        retryInProgress = true;
      }
    );
    if (!success) return;

    retryInProgress = false;
    clearEventsFromLocalStorage();
  }, interval);
}

export default flushEventsToServerPeriodically;
