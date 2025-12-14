import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e=>{
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      await login(email, pass)
      nav('/')
    }catch(err){
      setError(err.message || 'Credenciales invalidas')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2 className="mb-3">Iniciar sesion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contrasena</label>
            <input type="password" className="form-control" value={pass} onChange={e=>setPass(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>{loading? 'Ingresando...':'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}
