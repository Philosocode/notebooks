import axios from "axios";
import { store } from "shared/redux/store";
import { logout } from "user/redux/user.slice";

import { LOCAL_STORAGE_TOKEN_KEY } from "shared/constants.shared";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:5000/api/v1",
});

// automatically attach token to requests
api.interceptors.request.use((req) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (token) req.headers.Authorization = `Bearer ${token}`;

  return req;
});

api.interceptors.response.use((res) => res, (err) => {
  if (err.response.status === 401) {
    store.dispatch(logout());
  }

  return Promise.reject(err);
});