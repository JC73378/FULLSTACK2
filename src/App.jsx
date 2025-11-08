import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'
import ResultadoOk from './pages/ResultadoOk.jsx'
import ResultadoError from './pages/ResultadoError.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'
import Categorias from './pages/Categorias.jsx'
import Ofertas from './pages/Ofertas.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/productos" element={<Productos/>} />
            <Route path="/categorias" element={<Categorias/>} />
            <Route path="/ofertas" element={<Ofertas/>} />
            <Route path="/carrito" element={<Carrito/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/resultado/ok" element={<ResultadoOk/>} />
            <Route path="/resultado/error" element={<ResultadoError/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/coming-soon" element={<ComingSoon/>} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}
