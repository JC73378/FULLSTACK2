import React, { useMemo, useState, useEffect } from 'react'
import { comingSoon } from '../data/store'

const imgSrc = (rel) =>
  `${import.meta.env.BASE_URL}${String(rel || '').replace(/^\/+/, '')}`

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const KEY = 'funkostore-notify-subs'
const loadSubs = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
const saveSubs = (obj) => localStorage.setItem(KEY, JSON.stringify(obj))

export default function ComingSoon(){
  const [q,setQ] = useState('')
  const list = useMemo(()=>comingSoon,[])
  const filtered = useMemo(()=>{
    const s=q.trim().toLowerCase()
    if(!s) return list
    return list.filter(p => (p.name+' '+p.category).toLowerCase().includes(s))
  },[list,q])

  const [subs,setSubs] = useState({})
  const [emails,setEmails] = useState({})
  useEffect(()=>{ setSubs(loadSubs()) },[])

  const onChange = (id,val)=> setEmails(prev=>({ ...prev, [id]: val }))

  const notify = (id)=>{
    const raw = String(emails[id]||'').trim()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)
    if(!ok){ alert('Correo inválido'); return }
    const next = { ...loadSubs(), [id]: raw }
    saveSubs(next); setSubs(next)
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-md-6 ms-auto">
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            className="form-control"
            placeholder="Buscar en Coming Soon…"
          />
        </div>
      </div>

      <div className="row">
        {filtered.map(p => {
          const subscribed = Boolean(subs[p.id])
          const val = Number(p.price)
          const priceLabel = Number.isFinite(val) ? money.format(val) : 'Por anunciar'

          return (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img src={imgSrc(p.img)} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="mb-1"><strong>{priceLabel}</strong></p>
                  <p className="text-muted">Categoría: {p.category}</p>
                  <span className="badge text-bg-warning align-self-start mb-3">ETA {p.eta}</span>

                  {!subscribed ? (
                    <div className="mt-auto">
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="tu@email.com"
                          value={emails[p.id] || ''}
                          onChange={e=>onChange(p.id, e.target.value)}
                        />
                        <button className="btn btn-primary" type="button" onClick={()=>notify(p.id)}>
                          Notifícame
                        </button>
                      </div>
                      <small className="text-muted">Te avisaremos cuando esté disponible.</small>
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <div className="alert alert-success py-2 mb-2">
                        Te avisaremos a <strong>{subs[p.id]}</strong>
                      </div>
                      <button className="btn btn-outline-secondary" disabled>Próximamente</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
