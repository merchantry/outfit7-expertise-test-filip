import { toHumanReadableTime } from '../date';

describe('toHumanReadableTime', () => {
  it('should format ms to human readable time', () => {
    expect(toHumanReadableTime(1000)).toContain('second');
    expect(toHumanReadableTime(60000)).toContain('minute');
    expect(toHumanReadableTime(3600000)).toContain('hour');
    expect(toHumanReadableTime(86400000)).toContain('day');
    expect(toHumanReadableTime(2592000000)).toContain('month');
    expect(toHumanReadableTime(31536000000)).toContain('year');
  });
});
