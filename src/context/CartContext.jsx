import React, { createContext, useContext, useEffect, useState } from 'react'

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

  return <CartCtx.Provider value={{cart, add, remove, clear}}>{children}</CartCtx.Provider>
}

export const useCart = ()=> useContext(CartCtx)
