import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://your-api-base-url.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
