import axios from "axios";

export const authApi = axios.create({ baseURL: import.meta.env.VITE_API_AUTH });
export const catalogApi = axios.create({ baseURL: import.meta.env.VITE_API_CATALOG });
export const ordersApi = axios.create({ baseURL: import.meta.env.VITE_API_ORDERS });
export const notifApi = axios.create({ baseURL: import.meta.env.VITE_API_NOTIF });

// Helper to attach bearer token
export const withAuth = (client, token) => {
  client.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
  return client;
};
