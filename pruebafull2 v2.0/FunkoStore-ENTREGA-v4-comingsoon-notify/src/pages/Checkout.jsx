import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout(){
  const nav = useNavigate()
  const { user } = useAuth()
  const { cart, clear } = useCart()

  const [form, setForm] = useState({
    nombre: user?.name || '',
    email: user?.email || '',
    direccion: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})
  const onSubmit = e=>{
    e.preventDefault()
    setSubmitted(true)
    if(form.nombre && form.email && form.direccion && cart.length>0){
      clear()
      nav('/resultado/ok')
    }else{
      nav('/resultado/error')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-3">Checkout</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" className={"form-control"+(submitted && !form.nombre ? " is-invalid": "")} value={form.nombre} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className={"form-control"+(submitted && !form.email ? " is-invalid": "")} value={form.email} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input name="direccion" className={"form-control"+(submitted && !form.direccion ? " is-invalid": "")} value={form.direccion} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <button className="btn btn-primary">Pagar</button>
        </form>
      </div>
    </div>
  )
}
