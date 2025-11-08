import React, { useMemo } from 'react'
import { loadProducts } from '../data/store'
import { useCart } from '../context/CartContext.jsx'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const imgSrc = (rel) =>
  `${import.meta.env.BASE_URL}${String(rel || '').replace(/^\/+/, '')}`

export default function Productos() {
  const { add } = useCart()
  const list = useMemo(() => loadProducts(), [])

  return (
    <div className="row">
      {list.map(p => (
        <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
          <div className="card h-100 shadow-sm">
            <img src={imgSrc(p.img)} className="card-img-top" alt={p.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text mb-1"><strong>{money.format(p.price)}</strong></p>
              <p className="text-muted mb-3">Categoría: {p.category}</p>
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
