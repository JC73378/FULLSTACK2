import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const count = cart.reduce((a, i) => a + i.qty, 0)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          <span className="text-warning">Funko</span>Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Funkos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">Admin</NavLink>
            </li>
                      <li className="nav-item">
              <NavLink className="nav-link" to="/coming-soon">Coming&nbsp;Soon</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-2 text-light">
                    Hola, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={logout}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Registro</NavLink>
                </li>
              </>
            )}
            <li className="nav-item ms-3">
              <NavLink className="btn btn-warning fw-bold" to="/carrito">
                🛒 Carrito ({count})
              </NavLink>
            </li>
                      <li className="nav-item">
              <NavLink className="nav-link" to="/coming-soon">Coming&nbsp;Soon</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
