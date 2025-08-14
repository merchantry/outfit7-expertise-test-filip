import { isNewRoute, getRouteQuery } from '../routes';

describe('routes utils', () => {
  it('isNewRoute should detect "new" route', () => {
    expect(isNewRoute('new')).toBe(true);
    expect(isNewRoute('edit')).toBe(false);
  });

  it('getRouteQuery should return query param as string', () => {
    const route = { query: { foo: 'bar' } };
    expect(getRouteQuery(route, 'foo')).toBe('bar');
    expect(getRouteQuery(route, 'baz')).toBeUndefined();
  });
});
