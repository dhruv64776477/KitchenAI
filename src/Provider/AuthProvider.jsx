import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get("/auth/me");
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post("/auth/login", credentials);
            setUser(response.data.user);
            localStorage.setItem("authToken", response.data.token);
        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post("/auth/register", userData);
            setUser(response.data.user);
            localStorage.setItem("authToken", response.data.token);
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout");
            setUser(null);
            localStorage.removeItem("authToken");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
