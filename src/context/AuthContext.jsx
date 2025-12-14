import React, { createContext, useContext, useEffect, useState } from 'react'
import { authApi, setAccessToken } from '../api/client.js'

const AuthCtx = createContext()

export function AuthProvider({children}){
  const [auth, setAuth] = useState(()=>{
    try { return JSON.parse(sessionStorage.getItem('auth')) || { user: null, token: null } } catch { return { user: null, token: null } }
  })

  useEffect(()=>{
    sessionStorage.setItem('auth', JSON.stringify(auth))
    setAccessToken(auth.token)
  }, [auth])

  const login = async (email, password)=>{
    const data = await authApi.login({email, password})
    setAuth({
      user: { id: data.userId, name: data.name, email: data.email },
      token: data.token
    })
    return data
  }
  const register = async (payload)=>{
    const data = await authApi.register(payload)
    return data
  }
  const logout = ()=> setAuth({ user: null, token: null })

  return <AuthCtx.Provider value={{user: auth.user, token: auth.token, login, logout, register}}>{children}</AuthCtx.Provider>
}

export const useAuth = ()=> useContext(AuthCtx)
