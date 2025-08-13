export function maybePluralize(word: string, count: number) {
  return count === 1 ? word : `${word}s`;
}

export function cutString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}
