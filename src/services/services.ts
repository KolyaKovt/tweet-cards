import axios from "axios"
import { User } from "../Types"

const api = axios.create({
  baseURL: "https://65d63c32f6967ba8e3bdc174.mockapi.io/",
})

export const fetchUsers = async (limit: number, page: number) => {
  const res = await api.get<User[]>("/users", {
    params: {
      page,
      limit,
    },
  })

  const { data } = res
  console.log(res)

  return data
}

export const adjustUser = async (user: User) => {
  const { data } = await api.put<User>(`/users/${user.id}`, user)
  return data
}
