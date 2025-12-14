const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

let accessToken = sessionStorage.getItem('accessToken') || null;

export function setAccessToken(token) {
  accessToken = token || null;
  if (token) {
    sessionStorage.setItem('accessToken', token);
  } else {
    sessionStorage.removeItem('accessToken');
  }
}

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, value);
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const opts = {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body,
  };
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const productApi = {
  list: (params) => request(`/products${buildQuery(params)}`),
  get: (id) => request(`/products/${id}`),
  create: (payload) => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

export const comingSoonApi = {
  list: () => request('/coming-soon'),
};

export const orderApi = {
  list: (params) => request(`/orders${buildQuery(params)}`),
  create: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  updateStatus: (id, status) => request(`/orders/${id}/status${buildQuery({ status })}`, { method: 'PATCH' }),
};

export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
};

export { API_BASE, request };
