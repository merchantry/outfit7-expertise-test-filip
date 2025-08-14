import { maybePluralize, cutString } from '../string';

describe('string utils', () => {
  it('maybePluralize should pluralize when count != 1', () => {
    expect(maybePluralize('cat', 1)).toBe('cat');
    expect(maybePluralize('cat', 2)).toBe('cats');
  });

  it('cutString should cut and add ... if too long', () => {
    expect(cutString('hello', 10)).toBe('hello');
    expect(cutString('hello world', 5)).toBe('hello...');
  });
});
