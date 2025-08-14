import { getElementHtmlFromKey } from '../logs';

describe('getElementHtmlFromKey', () => {
  it('should return html element string from key', () => {
    const key = '[id]-[class1.class2]-[div]';
    const html = getElementHtmlFromKey(key);
    expect(html).toContain('id="id"');
    expect(html).toContain('class="class1 class2"');
    expect(html).toContain('<div');
  });
});
