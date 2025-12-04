import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8001/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/* -------------------------------
   REQUEST INTERCEPTOR
--------------------------------*/
axiosClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("x-access-token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* -------------------------------
   RESPONSE INTERCEPTOR
--------------------------------*/
axiosClient.interceptors.response.use(
    (response) => {
        const newToken = response.headers["x-access-token"];
        if (newToken) {
            sessionStorage.setItem("x-access-token", newToken);
        }
        return response;
    },
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
