import { newEvent, getChipColor } from '../events';

describe('events utils', () => {
  it('newEvent should return a new event object', () => {
    const event = newEvent('pid');
    expect(event.id).toBe('new');
    expect(event.projectId).toBe('pid');
    expect(event.name).toBe('');
    expect(event.description).toBe('');
    expect(event.priority).toBe('0');
    expect(event.type).toBe('crosspromo');
    expect(event.tags).toEqual([]);
  });

  it('getChipColor should return correct color', () => {
    expect(getChipColor('.foo')).toBe('orange');
    expect(getChipColor('#bar')).toBe('blue');
    expect(getChipColor('baz')).toBe('grey');
  });
});
