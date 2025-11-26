import api, { setAuthToken } from "./api"

export async function adminLogin(username: string, password: string) {
  const res = await api.post("/admin/login", { username, password })
  return res.data
}

export async function getDashboard() {
  const res = await api.get("/admin/dashboard")
  return res.data
}

export async function getBookings() {
  const res = await api.get("/admin/bookings")
  return res.data
}

export async function getRooms() {
  const res = await api.get("/admin/rooms")
  return res.data
}

export async function getUsers() {
  const res = await api.get("/admin/users")
  return res.data
}

export { setAuthToken }
