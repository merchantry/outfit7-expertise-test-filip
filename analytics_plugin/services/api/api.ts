import { API_URL } from '../../config';

const api = {
  async fetch<T>(route: string): Promise<T> {
    const response = await fetch(`${API_URL}/${route}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${route}: ${response.statusText}`);
    }
    return response.json();
  },
  async post<T, U = object>(route: string, data: U): Promise<T> {
    const response = await fetch(`${API_URL}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post to ${route}: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },
};

export default api;
