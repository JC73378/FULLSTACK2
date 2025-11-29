import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout(){
  const nav = useNavigate()
  const { user } = useAuth()
  const { cart, checkoutCart } = useCart()

  const [form, setForm] = useState({
    nombre: user?.name || '',
    email: user?.email || '',
    direccion: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})
  const onSubmit = async e=>{
    e.preventDefault()
    setSubmitted(true)
    setError(null)
    if(!(form.nombre && form.email && form.direccion && cart.length>0)){
      nav('/resultado/error')
      return
    }
    try{
      setLoading(true)
      await checkoutCart(1) // userId demo
      setLoading(false)
      nav('/resultado/ok')
    }catch(err){
      console.error(err)
      setLoading(false)
      const msg = err?.response?.data?.message || err?.message || 'No se pudo procesar el pedido.'
      setError(msg)
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
            <label className="form-label">Direccion</label>
            <input name="direccion" className={"form-control"+(submitted && !form.direccion ? " is-invalid": "")} value={form.direccion} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Procesando...' : 'Pagar'}</button>
        </form>
      </div>
    </div>
  )
}
