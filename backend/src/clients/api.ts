import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.jolpi.ca/ergast/api/f1',
  timeout: 5000,
  headers: { Accept: 'application/json' },
});
