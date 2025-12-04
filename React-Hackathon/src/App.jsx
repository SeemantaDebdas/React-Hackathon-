import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import { useAuthStore } from "./features/auth/authStore";
import { useEffect } from "react";

function App() {
    const user = useAuthStore((state) => state.user);
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        initializeAuth(); // Load token on refresh
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* Default redirect */}
                <Route path='/' element={<Navigate to='/login' replace />} />

                {/* Public route */}
                <Route path='/login' element={<LoginPage />} />

                {/* Protected route */}
                <Route
                    path='/chat'
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
