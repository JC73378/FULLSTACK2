import React, { useMemo, useState } from 'react'
import { loadProducts, createProduct, updateProduct, deleteProduct } from '../data/store'

export default function Admin(){
  const [list, setList] = useState(()=>loadProducts())
  const [form, setForm] = useState({id:null, name:'', price:'', category:'', onSale:false, img:'', stock:0})
  const [editing, setEditing] = useState(false)


  const submit = e=>{
    e.preventDefault()
    const payload = {...form, price:Number(form.price), stock:Number(form.stock), onSale: !!form.onSale}
    if(editing){
      updateProduct(payload)
    }else{
      createProduct(payload)
    }
    setList(loadProducts())
    setForm({id:null, name:'', price:'', category:'', onSale:false, img:'', stock:0})
    setEditing(false)
  }

  const edit = p=>{ setForm(p); setEditing(true) }
  const del = id=>{ deleteProduct(id); setList(loadProducts()) }

  return (
    <div className="row">
      <div className="col-md-5">
        <h4>{editing? 'Editar producto':'Nuevo producto'}</h4>
        <form onSubmit={submit}>
          <div className="mb-2"><input placeholder="Nombre" className="form-control" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/></div>
          <div className="mb-2"><input placeholder="Precio" type="number" className="form-control" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/></div>
          <div className="mb-2"><input placeholder="Categoría" className="form-control" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/></div>
          <div className="mb-2"><input placeholder="URL img" className="form-control" value={form.img} onChange={e=>setForm({...form, img:e.target.value})}/></div>
          <div className="mb-2"><input placeholder="Stock" type="number" className="form-control" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})}/></div>
          <div className="form-check mb-2">
            <input id="onSale" className="form-check-input" type="checkbox" checked={form.onSale} onChange={e=>setForm({...form, onSale:e.target.checked})}/>
            <label htmlFor="onSale" className="form-check-label">Oferta</label>
          </div>
          <button className="btn btn-primary">{editing? 'Guardar cambios':'Crear'}</button>
          {editing && <button type="button" className="btn btn-outline-secondary ms-2" onClick={()=>{setEditing(False); setForm({id:null, name:'', price:'', category:'', onSale:false, img:'', stock:0})}}>Cancelar</button>}
        </form>
      </div>
      <div className="col-md-7">
        <h4>Inventario</h4>
        <table className="table table-striped">
          <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {list.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>${p.price}</td><td>{p.stock}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>edit(p)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>del(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
