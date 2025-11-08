import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Carrito(){
  const { cart, remove, clear } = useCart()
  const total = cart.reduce((a,i)=>a+i.price*i.qty,0)

  if(cart.length===0){
    return <div className="text-center">
      <p>Tu carrito está vacío.</p>
      <Link to="/productos" className="btn btn-primary">Ir a productos</Link>
    </div>
  }

  return (
    <div>
      <h2 className="mb-3">Carrito</h2>
      <table className="table">
        <thead>
          <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Total</th><th></th></tr>
        </thead>
        <tbody>
          {cart.map(i=>(
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.qty}</td>
              <td>${i.price}</td>
              <td>${i.price*i.qty}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(i.id)}>Quitar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-secondary" onClick={clear}>Vaciar</button>
        <div className="h5 mb-0">Total: ${total}</div>
      </div>
      <div className="text-end mt-3">
        <Link to="/checkout" className="btn btn-success">Ir al pago</Link>
      </div>
    </div>
  )
}
