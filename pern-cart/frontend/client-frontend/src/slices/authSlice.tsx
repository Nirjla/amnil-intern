import { createSlice } from "@reduxjs/toolkit"

const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000

const savedToken = localStorage.getItem('token')
const savedExpiration = parseInt(localStorage.getItem('expiration') || '0',)
const savedUser = localStorage.getItem('user')
const initialState = {
      isAuthenticated: savedToken ? Date.now() < savedExpiration : false,
      token: savedToken || null,
      user: savedUser || null
}

const authSlice = createSlice({
      name: 'auth',
      initialState: initialState,
      reducers: {
            setCredentials: (state, action) => {
                  state.isAuthenticated = true;
                  state.token = action.payload.token,
                  state.user = action.payload.user,
                  localStorage.setItem('token', action.payload.token)
                  localStorage.setItem('user', action.payload.user)
                  const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME
                  localStorage.setItem('expiration', expirationTime.toString())
            },
            logout: (state) => {
                  state.isAuthenticated = false;
                  state.token = null
                  state.user = null
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  localStorage.removeItem('expiration')
            }
      }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer