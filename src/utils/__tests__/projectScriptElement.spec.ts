import { getScriptElement } from '../projectScriptElement';

describe('getScriptElement', () => {
  it('should return script tag with apiKey', () => {
    const apiKey = 'abc123';
    expect(getScriptElement(apiKey)).toContain(apiKey);
    expect(getScriptElement(apiKey)).toContain('<script');
  });
});
