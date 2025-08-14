export function isNewRoute(routeId: string | undefined) {
  return routeId === 'new';
}

export function getRouteQuery(
  route: { query: Record<string, string> },
  queryName: string
) {
  if (!route || !route.query || !(queryName in route.query)) return undefined;

  return String(route.query[queryName]);
}
