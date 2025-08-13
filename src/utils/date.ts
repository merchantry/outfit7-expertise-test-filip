import { maybePluralize } from './string';
import { second } from './time';

export function toHumanReadableTime(ms: number): string {
  const seconds = Math.floor(ms / second);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} ${maybePluralize('year', years)}`;
  if (months > 0) return `${months} ${maybePluralize('month', months)}`;
  if (days > 0) return `${days} ${maybePluralize('day', days)}`;
  if (hours > 0) return `${hours} ${maybePluralize('hour', hours)}`;
  if (minutes > 0) return `${minutes} ${maybePluralize('minute', minutes)}`;

  return `${seconds} ${maybePluralize('second', seconds)}`;
}
