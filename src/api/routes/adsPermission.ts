import api from '../api';

export async function getAdsPermission(countryCode: string) {
  return api.get<boolean>(`ads-permission/${countryCode}`);
}
