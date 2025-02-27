import axios from 'axios'
import { store } from 'shared/redux/store'
import { logout } from 'user/redux/user.slice'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:5001/api/v1',
})

// automatically attach token to requests
api.interceptors.request.use((req) => {
  const token = store.getState().user.token

  if (token) req.headers.Authorization = `Bearer ${token}`

  return req
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logout())
    }

    return Promise.reject(err)
  }
)
