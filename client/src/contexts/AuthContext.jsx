import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const rawUser = localStorage.getItem("ai-village-brain-user");
    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch (error) {
        console.warn("Invalid stored auth user found. Clearing local session.", error);
        localStorage.removeItem("ai-village-brain-user");
        localStorage.removeItem("ai-village-brain-token");
      }
    }

    setLoading(false);
  }, []);

  async function login(credentials) {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("ai-village-brain-token", response.token);
    localStorage.setItem("ai-village-brain-user", JSON.stringify(response.user));
    setUser(response.user);
    return response.user;
  }

  async function signup(payload) {
    const response = await api.post("/auth/signup", payload);
    localStorage.setItem("ai-village-brain-token", response.token);
    localStorage.setItem("ai-village-brain-user", JSON.stringify(response.user));
    setUser(response.user);
    return response.user;
  }

  function logout() {
    localStorage.removeItem("ai-village-brain-token");
    localStorage.removeItem("ai-village-brain-user");
    setUser(null);
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
