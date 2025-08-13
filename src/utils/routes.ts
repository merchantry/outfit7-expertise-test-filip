import { RouteLocationNormalized } from 'vue-router';

export function isNewRoute(routeId: string | undefined) {
  return routeId === 'new';
}

export function getRouteQuery(
  route: RouteLocationNormalized,
  queryName: string
) {
  if (!route || !route.query || !(queryName in route.query)) return undefined;

  return String(route.query[queryName]);
}
