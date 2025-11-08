import React, { useState } from 'react'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:''})
  const [submitted, setSubmitted] = useState(false)
  const onChange = e=> setForm({...form, [e.target.name]: e.target.value})
  const onSubmit = e=>{ e.preventDefault(); setSubmitted(true) }
  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2 className="mb-3">Registro</h2>
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
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className={"form-control"+(submitted && !form.password ? " is-invalid": "")} value={form.password} onChange={onChange}/>
            <div className="invalid-feedback">Requerido</div>
          </div>
          <button className="btn btn-primary">Crear cuenta</button>
        </form>
      </div>
    </div>
  )
}
