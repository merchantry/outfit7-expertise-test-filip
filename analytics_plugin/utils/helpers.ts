export function randomHex(length: number): string {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export function randomUUID(): string {
  return `${randomHex(8)}-${randomHex(4)}-${randomHex(4)}-${randomHex(
    4
  )}-${randomHex(12)}`;
}

export function debounce<A extends unknown[], T extends (...args: A) => void>(
  fn: T,
  delay: number
): T {
  let timeout: NodeJS.Timeout;
  return function (...args: A) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  } as T;
}
