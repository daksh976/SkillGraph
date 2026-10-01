import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("skillgraph_user");
      const savedToken = localStorage.getItem("skillgraph_token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to restore session:", error);

      localStorage.removeItem("skillgraph_user");
      localStorage.removeItem("skillgraph_token");
    } finally {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);

    localStorage.setItem("skillgraph_token", data.token);
    localStorage.setItem("skillgraph_user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const login = async (email, password) => {
    const data = await loginUser(email, password);

    localStorage.setItem("skillgraph_token", data.token);
    localStorage.setItem("skillgraph_user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const updateProfile = async (selectedLanguage, selectedCareer) => {
    const data = await updateUserProfile(
      selectedLanguage,
      selectedCareer
    );

    localStorage.setItem("skillgraph_user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("skillgraph_token");
    localStorage.removeItem("skillgraph_user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        register,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}