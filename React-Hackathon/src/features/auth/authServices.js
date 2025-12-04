import axiosClient from "../../axiosClient";

export async function loginUser({ email, password }) {
    const res = await axiosClient.post("/auth/login", {
        username: email,
        password,
    });

    return res.data; // axios interceptor handles token
}
