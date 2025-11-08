import React from 'react'
import { loadProducts } from '../data/store'
import { useCart } from '../context/CartContext.jsx'

export default function Ofertas(){
  const { add } = useCart()
  const list = loadProducts().filter(p=>p.onSale)
  return (
    <div className="row">
      {list.map(p=>(
        <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
          <div className="card h-100 border-success">
            <img src={p.img} className="card-img-top" alt={p.name} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Oferta: ${p.price}</p>
              <button className="btn btn-success mt-auto" onClick={()=>add(p,1)}>Agregar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
