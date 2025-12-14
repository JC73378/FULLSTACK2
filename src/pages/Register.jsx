import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register(){
  const { register, login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({name:'', email:'', password:''})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = async e=>{
    e.preventDefault()
    setSubmitted(true)
    setError('')
    setMessage('')
    if(!form.name || !form.email || !form.password) return
    setLoading(true)
    try{
      await register(form)
      setMessage('Registro exitoso, iniciando sesion...')
      await login(form.email, form.password)
      nav('/')
    }catch(err){
      setError(err.message || 'No se pudo registrar')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2 className="mb-3">Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="name" className={"form-control"+(submitted && !form.name ? " is-invalid": "")} value={form.name} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className={"form-control"+(submitted && !form.email ? " is-invalid": "")} value={form.email} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Contrasena</label>
            <input name="password" type="password" className={"form-control"+(submitted && !form.password ? " is-invalid": "")} value={form.password} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <button className="btn btn-primary" disabled={loading}>{loading? 'Enviando...':'Crear cuenta'}</button>
        </form>
      </div>
    </div>
  )
}
