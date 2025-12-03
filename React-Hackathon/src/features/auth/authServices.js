import { api } from "../../api";

export async function loginUser({ email, password }) {
    const res = await api.post("/auth/login", {
        username: email,
        password,
    });
    return res.data;
}
