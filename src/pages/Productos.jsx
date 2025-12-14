import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { productApi } from '../api/client.js'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const imgSrc = (rel) =>
  rel?.startsWith('http')
    ? rel
    : `${import.meta.env.BASE_URL}${String(rel || '').replace(/^\/+/, '')}`

export default function Productos() {
  const { add } = useCart()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    productApi.list()
      .then(data => { if (active) setList(data) })
      .catch(err => { if (active) setError(err.message || 'No se pudo cargar el catalogo') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  if (loading) return <p>Cargando catalogo...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="row">
      {list.map(p => (
        <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
          <div className="card h-100 shadow-sm">
            <img src={imgSrc(p.imageUrl || p.img)} className="card-img-top" alt={p.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text mb-1"><strong>{money.format(p.price)}</strong></p>
              <p className="text-muted mb-3">Categoria: {p.category}</p>
              <button className="btn btn-primary mt-auto" onClick={() => add(p, 1)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
