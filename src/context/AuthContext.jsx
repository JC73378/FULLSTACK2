import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext()

export function AuthProvider({children}){
  const [user, setUser] = useState(()=>{
    try { return JSON.parse(sessionStorage.getItem('user')) || null } catch { return null }
  })
  useEffect(()=>{
    if(user) sessionStorage.setItem('user', JSON.stringify(user))
    else sessionStorage.removeItem('user')
  }, [user])

  // Login local sin JWT: guarda el usuario si hay email y password
  const login = (email, password)=>{
    if(email && password){
      setUser({ name: email.split('@')[0], email })
      return true
    }
    return false
  }
  const logout = ()=> setUser(null)

  return <AuthCtx.Provider value={{user, login, logout}}>{children}</AuthCtx.Provider>
}

export const useAuth = ()=> useContext(AuthCtx)
