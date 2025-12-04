import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const hasToken = sessionStorage.getItem("x-access-token");

    if (!hasToken) return <Navigate to='/login' replace />;

    return children;
}
