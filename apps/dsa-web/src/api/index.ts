import axios from 'axios';
import { API_BASE_URL, APP_BASE_PATH, withAppBasePath } from '../utils/constants';
import { attachParsedApiError } from './error';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname + window.location.search;
      const loginPath = withAppBasePath('/login');
      if (!path.startsWith('/login') && !path.startsWith(loginPath)) {
        const redirectPath = APP_BASE_PATH && path.startsWith(APP_BASE_PATH)
          ? path.slice(APP_BASE_PATH.length) || '/'
          : path;
        const redirect = encodeURIComponent(redirectPath);
        window.location.assign(withAppBasePath(`/login?redirect=${redirect}`));
      }
    }
    attachParsedApiError(error);
    return Promise.reject(error);
  }
);

export default apiClient;
