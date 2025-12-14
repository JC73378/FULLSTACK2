import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { productApi } from '../api/client.js'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const imgSrc = (rel) =>
  rel?.startsWith('http')
    ? rel
    : `${import.meta.env.BASE_URL}${String(rel || '').replace(/^\/+/, '')}`

export default function Ofertas(){
  const { add } = useCart()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    productApi.list({ onSale: true })
      .then(data => { if (mounted) setList(data.filter(p => p.onSale)) })
      .catch(err => { if (mounted) setError(err.message || 'No se pudieron cargar las ofertas') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) return <p>Cargando ofertas...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (list.length === 0) return <p>No hay ofertas activas.</p>

  return (
    <div className="row">
      {list.map(p=>(
        <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
          <div className="card h-100 border-success">
            <img src={imgSrc(p.imageUrl || p.img)} className="card-img-top" alt={p.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Oferta: {money.format(p.price)}</p>
              <button className="btn btn-success mt-auto" onClick={()=>add(p,1)}>Agregar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
