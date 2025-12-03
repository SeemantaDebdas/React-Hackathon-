import { create } from "zustand";
import { loginUser } from "../auth/authServices";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const data = await loginUser({ email, password });
            set({ user: data, loading: false });
        } catch {
            set({ error: "Invalid credentials", loading: false });
        }
    },
}));
