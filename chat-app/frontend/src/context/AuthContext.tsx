import { createContext, ReactNode, useContext, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { IUserResponse } from "../components/interfaces/interfaces";


interface AuthContextType {
      user: IUserResponse | null,
      token: string | null,
      loginAction: (data: IUserResponse) => Promise<void>
      logout: () => void,
      isAuthenticated: () => boolean
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
      const [user, setUser] = useState<IUserResponse | null>(getLocalStorage('user') || null)
      const [token, setToken] = useState<string | null>(getLocalStorage('user')?.token || null)
      const expirationTime = getLocalStorage('user')
      const navigate = useNavigate()
      const loginAction = async (data: IUserResponse) => {
            if (data) {
                  setUser(data);
                  setToken(data?.token);
                  setLocalStorage('user', { ...data, expiration: Date.now() + 60 * 60 * 60 * 1000 })
                  navigate('/dashboard')
                  return
            }
      }
      const logout = () => {
            if (expirationTime > Date.now()) {
                  setUser(null);
                  setToken(null);
                  localStorage.removeItem("user")
                  navigate("/login")
            }
      }
      const isAuthenticated = () => {
            const storedUser = getLocalStorage('user')
            if (storedUser && storedUser.expiration && storedUser.expiration > Date.now()) {
                  return true
            } else {
                  logout();
                  return false
            }
      }
      return (
            <AuthContext.Provider value={{ user, token, loginAction, logout, isAuthenticated }}>
                  {children}
            </AuthContext.Provider>
      )

}

export const useAuth = () => {
      const context = useContext(AuthContext)
      if (!context) {
            throw new Error("useAuth must used within an authprovider")
      }
      return context
}