import React, { createContext, useContext, useEffect, useState } from 'react'
import { ordersApi } from '../services/api'

const CartCtx = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })
  useEffect(()=>localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  const add = (product, qty=1)=>{
    setCart(prev=>{
      const i = prev.findIndex(p=>p.id===product.id)
      if(i>=0){
        const copy = [...prev]
        copy[i] = {...copy[i], qty: copy[i].qty + qty}
        return copy
      }
      return [...prev, {...product, qty}]
    })
  }
  const remove = (id)=> setCart(prev=>prev.filter(p=>p.id!==id))
  const clear = ()=> setCart([])

  // En checkout sincronizamos con el microservicio de pedidos
  const checkoutCart = async (userId=1)=>{
    if(!ordersApi.defaults.baseURL){
      throw new Error('VITE_API_ORDERS no esta configurado (revisa .env.local y reinicia npm run dev)')
    }
    if(cart.length===0) throw new Error('Carrito vacio')
    // crear carrito en backend
    const cartResp = await ordersApi.post('/api/v1/orders/cart', { userId })
    const backendCartId = cartResp.data.id
    // enviar items
    for(const item of cart){
      await ordersApi.post(`/api/v1/orders/cart/${backendCartId}/items`, {
        productId: item.id,
        quantity: item.qty,
        unitPrice: item.price
      })
    }
    // checkout
    const orderResp = await ordersApi.post(`/api/v1/orders/checkout/${backendCartId}`)
    clear()
    return orderResp.data
  }

  return <CartCtx.Provider value={{cart, add, remove, clear, checkoutCart}}>{children}</CartCtx.Provider>
}

export const useCart = ()=> useContext(CartCtx)


