import { validateTag, isRequired } from '../inputRules';

describe('inputRules', () => {
  it('validateTag should validate class/id', () => {
    expect(validateTag('.foo')).toBe(true);
    expect(validateTag('#bar')).toBe(true);
    expect(validateTag('')).toBe(true);
    expect(validateTag('baz')).toBe('Tag must either be an id (#example), a class (.example)');
  });

  it('isRequired should validate non-empty', () => {
    expect(isRequired('foo')).toBe(true);
    expect(isRequired('')).toBe('This field is required');
  });
});
