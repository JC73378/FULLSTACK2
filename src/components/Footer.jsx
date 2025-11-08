
import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="fw-bold">© 2025 FunkoStore</div>
        <div className="d-flex gap-3">
          <a className="text-white text-decoration-none" href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a className="text-white text-decoration-none" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="text-white text-decoration-none" href="https://www.tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <a className="text-white text-decoration-none" href="mailto:ventas@funkostore.cl">Contacto</a>
        </div>
      </div>
    </footer>
  )
}
