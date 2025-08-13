export function getLocalStorage<T>(key: string): T | undefined {
  return (JSON.parse(localStorage.getItem(key) || 'null') as T) || undefined;
}

export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
