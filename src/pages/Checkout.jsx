import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { orderApi } from '../api/client.js'

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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = async e=>{
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if(!(form.nombre && form.email && form.direccion && cart.length>0)){
      return
    }
    setLoading(true)
    try{
      await orderApi.create({
        customer: { fullName: form.nombre, email: form.email, address: form.direccion },
        items: cart.map(item => ({ productId: item.id, quantity: item.qty })),
      })
      clear()
      nav('/resultado/ok')
    }catch(err){
      setError(err.message || 'No se pudo procesar el pago')
      nav('/resultado/error')
    }finally{
      setLoading(false)
    }
  }

  if(cart.length===0){
    return <div className="text-center">
      <p>Tu carrito esta vacio.</p>
    </div>
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-3">Checkout</h2>
        <p className="text-muted">Total: <strong>${total.toFixed(2)}</strong></p>
        {error && <div className="alert alert-danger">{error}</div>}
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
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Procesando...' : 'Pagar'}</button>
        </form>
      </div>
    </div>
  )
}
