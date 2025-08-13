import axios from 'axios';

const api = {
  async fetch<T>(url: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(url);

      return data;
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error;
    }
  },
};

export default api;
