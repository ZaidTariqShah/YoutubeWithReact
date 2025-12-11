import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser() {
    try {
      const res = await api.get("/current-user", { withCredentials: true });
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function logout() {
    await api.post("/logout", {}, { withCredentials: true });
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
