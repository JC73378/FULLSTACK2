import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-5 fw-bold text-uppercase mb-3">
        Bienvenido a <span className="text-warning">FunkoStore</span>
      </h1>
      <p className="lead text-muted mb-4">
        Encuentra los Funkos más exclusivos y de edición limitada. <br />
        ¡Colecciona tus personajes favoritos y haz crecer tu vitrina!
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/productos" className="btn btn-warning btn-lg text-dark fw-bold">
          🛍️ Ver Funkos
        </Link>
        <Link to="/ofertas" className="btn btn-outline-light btn-lg border-warning text-warning fw-bold">
          ⭐ Ofertas
        </Link>
      </div>
    </div>
  )
}
