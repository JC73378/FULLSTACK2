import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productApi } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'

const emptyProduct = { id: null, name: '', price: '', category: '', onSale: false, imageUrl: '', stock: 0, active: true }

export default function Admin(){
  const { user } = useAuth()
  const nav = useNavigate()
  const [list, setList] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const refresh = () => {
    setLoading(true)
    setError('')
    productApi.list({ includeInactive: true })
      .then(data => setList(data))
      .catch(err => setError(err.message || 'No se pudo cargar el inventario'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!user) {
      nav('/login')
      return
    }
    refresh()
  }, [user, nav])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const submit = async e => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      imageUrl: form.imageUrl,
      stock: Number(form.stock),
      onSale: Boolean(form.onSale),
      active: Boolean(form.active),
    }
    try {
      if (editing && form.id) {
        await productApi.update(form.id, payload)
        setMessage('Producto actualizado')
      } else {
        await productApi.create(payload)
        setMessage('Producto creado')
      }
      setForm(emptyProduct)
      setEditing(false)
      refresh()
    } catch (err) {
      setError(err.message || 'No se pudo guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  const edit = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      stock: p.stock,
      onSale: p.onSale,
      active: p.active,
    })
    setEditing(true)
    setMessage('')
    setError('')
  }

  const del = async (id) => {
    if (!window.confirm('Eliminar producto?')) return
    setSaving(true)
    setMessage('')
    setError('')
    try {
      await productApi.remove(id)
      setMessage('Producto eliminado')
      refresh()
    } catch (err) {
      setError(err.message || 'No se pudo eliminar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <h4>{editing? 'Editar producto':'Nuevo producto'}</h4>
        {message && <div className="alert alert-success py-2">{message}</div>}
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={submit}>
          <div className="mb-2">
            <input
              placeholder="Nombre"
              className="form-control"
              value={form.name}
              onChange={e=>handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              placeholder="Precio"
              type="number"
              min="0"
              step="0.01"
              className="form-control"
              value={form.price}
              onChange={e=>handleChange('price', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              placeholder="Categoria"
              className="form-control"
              value={form.category}
              onChange={e=>handleChange('category', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              placeholder="URL img"
              className="form-control"
              value={form.imageUrl}
              onChange={e=>handleChange('imageUrl', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              placeholder="Stock"
              type="number"
              min="0"
              className="form-control"
              value={form.stock}
              onChange={e=>handleChange('stock', e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-2">
            <input
              id="onSale"
              className="form-check-input"
              type="checkbox"
              checked={form.onSale}
              onChange={e=>handleChange('onSale', e.target.checked)}
            />
            <label htmlFor="onSale" className="form-check-label">Oferta</label>
          </div>
          <div className="form-check mb-3">
            <input
              id="active"
              className="form-check-input"
              type="checkbox"
              checked={form.active}
              onChange={e=>handleChange('active', e.target.checked)}
            />
            <label htmlFor="active" className="form-check-label">Activo</label>
          </div>
          <button className="btn btn-primary" disabled={saving}>{saving? 'Guardando...': (editing? 'Guardar cambios':'Crear')}</button>
          {editing && (
            <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={()=>{ setEditing(false); setForm(emptyProduct); setMessage(''); setError('') }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
      <div className="col-md-7">
        <h4>Inventario</h4>
        {loading ? <p>Cargando...</p> : (
          <table className="table table-striped">
            <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
            <tbody>
              {list.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>edit(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>del(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
