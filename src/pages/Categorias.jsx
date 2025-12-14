import React, { useEffect, useMemo, useState } from 'react'
import { productApi } from '../api/client.js'

export default function Categorias(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=> {
    let alive = true
    productApi.list()
      .then(data => { if (alive) setProducts(data) })
      .catch(err => { if (alive) setError(err.message || 'No se pudieron cargar las categorias') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const cats = useMemo(() => [...new Set(products.map(p=>p.category))], [products])

  if (loading) return <p>Cargando categorias...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="row">
      {cats.map(c=>(
        <div className="col-12 col-sm-6 col-md-4 mb-3" key={c}>
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{c}</h5>
              <p className="card-text flex-grow-1">Explora productos de {c}.</p>
              <a className="btn btn-outline-primary mt-auto" href="/productos">Ver</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
