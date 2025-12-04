import { create } from "zustand";
import { loginUser } from "../auth/authServices";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    /* -----------------------------------
       INITIALIZE USER FROM TOKEN
    ----------------------------------- */
    initializeAuth: () => {
        const token = sessionStorage.getItem("x-access-token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            console.log(decoded);
            const userData = {
                id: decoded.sub,
                username: decoded.username,
                role: decoded.role,
            };

            set({ user: userData });
            console.log("Auth initialized from token:", userData);
        } catch (err) {
            console.warn("Invalid or expired token. Clearing it.");
            sessionStorage.removeItem("x-access-token");
        }
    },

    /* -----------------------------------
       LOGIN
    ----------------------------------- */
    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const response = await loginUser({ email, password });

            // backend returns token
            // const token = response.headers["x-access-token"];
            // sessionStorage.setItem("x-access-token", token);

            // decode user info
            //const decoded = jwtDecode(token);
            //console.log(decoded);

            const userData = response.user;

            set({ user: userData, loading: false });
            return true;
        } catch (err) {
            set({
                error: err?.response?.data?.message || "Invalid credentials",
                loading: false,
            });
            return false;
        }
    },

    /* -----------------------------------
       LOGOUT
    ----------------------------------- */
    logout: () => {
        sessionStorage.removeItem("x-access-token");

        set({
            user: null,
            loading: false,
            error: null,
        });
    },
}));
