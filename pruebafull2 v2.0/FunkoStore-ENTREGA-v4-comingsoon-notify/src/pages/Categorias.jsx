import React from 'react'
import { loadProducts } from '../data/store'

export default function Categorias(){
  const list = loadProducts()
  const cats = [...new Set(list.map(p=>p.category))]
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
