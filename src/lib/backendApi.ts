import type { BackendErrorResponse } from '../types/storefront';

const backendBaseUrl = (import.meta.env.VITE_BACKEND_API_URL || '').replace(/\/$/, '');

const buildUrl = (path: string) => {
  if (!backendBaseUrl) {
    return '';
  }

  return `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const hasBackendApiConfigured = () => Boolean(backendBaseUrl);

export const getJson = async <T>(path: string, init?: RequestInit) => {
  const url = buildUrl(path);

  if (!url) {
    throw new Error('Backend API URL is not configured');
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as Partial<BackendErrorResponse>;
      if (errorBody.message) {
        errorMessage = errorBody.message;
      }
    } catch {
      // Ignore non-JSON error bodies.
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
};
