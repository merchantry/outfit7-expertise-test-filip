export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retryUntilSuccessful<T>(
  fn: () => Promise<T>,
  delays: number[],
  onFailure: ((err: Error) => void) | null = null
): Promise<T | undefined> {
  return new Promise(resolve => {
    const cb = async () => {
      for (const delay of delays) {
        try {
          const result = await fn();
          if (result) resolve(result);
        } catch (error) {
          if (onFailure) onFailure(error as Error);
        }
        await wait(delay);
      }

      resolve(undefined);
    };
    cb();
  });
}
