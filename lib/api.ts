import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_BASE || ""

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

export default api
