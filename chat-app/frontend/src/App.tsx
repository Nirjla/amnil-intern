import { Navigate, Route, Routes } from "react-router-dom"
import './index.css'
import Login from "./components/pages/Login"
import { AuthContextProvider } from "./context/AuthContext"
import ProtectedRoute from "./routes/ProtectedRoute"
import { MainChat } from "./components/pages/MainChat"
export default function App() {
      return (
            <>
                  <AuthContextProvider>
                        <Routes>
                              <Route path="/" element={<Navigate to="/login" />} />
                              <Route path="/login" element={<Login />} />
                              <Route element={<ProtectedRoute />}>
                                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                                    <Route path="/main-chat" element={<MainChat />} />
                              </Route>

                        </Routes>
                  </AuthContextProvider >

            </>
      )
}