import axios from 'axios';
import { handleGlobalError } from './error-handler.js';

/**
 * Resolves the API Base URL.
 * Priority: VITE_API_BASE_URL env > VITE_API_URL env > fallback
 * In localhost/dev, prevents accidental prod connections.
 *
 * @param {string} [fallbackUrl] - Optional fallback URL override
 */
export const getApiBaseUrl = (fallbackUrl) => {
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('10.'));

  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL);

  if (isLocalhost || (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
    if (envUrl) return envUrl;
    return fallbackUrl || '';
  }

  return envUrl || fallbackUrl || '';
};

/**
 * Create a configured axios instance.
 *
 * @param {Object} options
 * @param {string} [options.baseURL] - API base URL
 * @param {boolean} [options.withAuth=true] - Attach Bearer token from localStorage
 * @param {boolean} [options.withAutoRefresh=true] - Enable 401 token refresh
 * @param {string} [options.accessTokenKey='accessToken'] - localStorage key for access token
 * @param {string} [options.refreshTokenKey='refreshToken'] - localStorage key for refresh token
 * @param {string} [options.refreshEndpoint='/api/v1/auth/refresh-token'] - Token refresh endpoint
 */
export function createApiClient({
  baseURL = '',
  withAuth = true,
  withAutoRefresh = true,
  accessTokenKey = 'accessToken',
  refreshTokenKey = 'refreshToken',
  refreshEndpoint = '/api/v1/auth/refresh-token',
} = {}) {
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  if (withAuth) {
    client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(accessTokenKey);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  if (withAutoRefresh) {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
      failedQueue = [];
    };

    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url || '';
        const isAuthRequest =
          requestUrl.includes('/auth/login') ||
          requestUrl.includes('/auth/refresh-token');

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !isAuthRequest
        ) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            if (typeof window === 'undefined') throw new Error('Not in browser');
            const refreshToken = localStorage.getItem(refreshTokenKey);
            if (!refreshToken) throw new Error('Session expired. Please sign in again.');

            const res = await axios.post(`${baseURL}${refreshEndpoint}`, { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = res.data.data;

            localStorage.setItem(accessTokenKey, accessToken);
            if (newRefreshToken) localStorage.setItem(refreshTokenKey, newRefreshToken);

            client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            processQueue(null, accessToken);
            return client(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem(accessTokenKey);
              localStorage.removeItem(refreshTokenKey);
              localStorage.removeItem('user');
            }
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        if (typeof window !== 'undefined' && !isAuthRequest) {
          handleGlobalError(error);
        }
        return Promise.reject(error);
      }
    );
  }

  return client;
}

export default createApiClient;
