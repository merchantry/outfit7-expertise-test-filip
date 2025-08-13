import api from './api';

export async function getPublicIp(): Promise<string> {
  const res = await api.fetch<{ ip: string }>(
    'https://api.ipify.org?format=json'
  );
  return res.ip;
}

export async function getCountryCode(ip: string): Promise<string> {
  const res = await api.fetch<{ countryCode: string }>(
    `http://ip-api.com/json/${ip}`
  );
  return res.countryCode;
}
