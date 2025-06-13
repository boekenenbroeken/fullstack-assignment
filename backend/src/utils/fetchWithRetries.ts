import axios, { AxiosError } from 'axios';

export async function fetchWithRetries<T>(url: string, retries = 5, delay = 300): Promise<T> {
  try {
    const response = await axios.get<T>(url);

    return response.data;
  } catch (err) {
    const error = err as AxiosError;

    if (retries > 0 && error?.response?.status === 429) {
      console.warn(`⚠ Throttled. Retrying in ${delay}ms (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, delay));

      return fetchWithRetries<T>(url, retries - 1, delay * 2);
    }

    throw err;
  }
}
