
(function(global){
  'use strict';
  const Admin = {};

  // ===== common.js =====
  Admin.ALLOWED_DOMAINS = ['duoc.cl','profesor.duoc.cl','gmail.com'];

  Admin.getSession = function(){
    try { return JSON.parse(localStorage.getItem('admin_session')) || null; } catch { return null; }
  };
  Admin.setSession = function(s){ localStorage.setItem('admin_session', JSON.stringify(s)); };
  Admin.clearSession = function(){ localStorage.removeItem('admin_session'); };

  Admin.requireAuth = function(roles){
    roles = roles || [];
    const s = Admin.getSession();
    if(!s){ location.href = './login.html'; return; }
    if(roles.length && !roles.includes(s.rol)){
      location.href = './index.html';
      return;
    }
    const userEl = document.querySelector('[data-user]');
    if (userEl) userEl.textContent = `${s.usuario} • ${s.rol}`;
  };

  Admin.saveLS = function(key, value){ localStorage.setItem(key, JSON.stringify(value)); };
  Admin.loadLS = function(key, fallback){
    fallback = fallback===undefined ? [] : fallback;
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };
  Admin.uid = function(){ return Math.random().toString(36).slice(2,10); };
  Admin.formatMoney = function(n){
    const v = Number(n || 0);
    try { return v.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }); }
    catch { return '$' + v; }
  };
  Admin.isInt = function(n){ return Number.isInteger(Number(n)); };
  Admin.isNum = function(n){ return !isNaN(n) && isFinite(n); };

  // ===== validators.js =====
  Admin.validEmailByDomain = function(email){
    if(!email) return false;
    const m = email.toLowerCase().match(/^[^@\s]+@([^@\s]+\.[^@\s]+)$/);
    if(!m) return false;
    const domain = m[1];
    return Admin.ALLOWED_DOMAINS.some(d => domain.endsWith(d));
  };
  Admin.validPassword = function(pw){ return typeof pw === 'string' && pw.length >= 4 && pw.length <= 10; };
  Admin.validRUN = function(runRaw){
    if(!runRaw) return false;
    const run = String(runRaw).trim().toUpperCase();
    if(!/^[0-9K]{7,9}$/.test(run)) return false;
    const body = run.slice(0, -1);
    const dv = run.slice(-1);
    let sum = 0, multiplier = 2;
    for(let i = body.length - 1; i >= 0; i--){
      sum += Number(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const res = 11 - (sum % 11);
    const dvCalc = res === 11 ? '0' : (res === 10 ? 'K' : String(res));
    return dv === dvCalc;
  };
  Admin.maxLen = (s, n) => (s ?? '').length <= n;
  Admin.minLen = (s, n) => (s ?? '').length >= n;

  Admin.validateProduct = function(p){
    const errors = {};
    if(!Admin.minLen(p.codigo, 3)) errors.codigo = 'Código requerido, mínimo 3.';
    if(!p.nombre) errors.nombre = 'Nombre requerido.';
    else if(!Admin.maxLen(p.nombre, 100)) errors.nombre = 'Máximo 100 caracteres.';
    if(p.descripcion && !Admin.maxLen(p.descripcion, 500)) errors.descripcion = 'Máximo 500 caracteres.';
    if(p.precio === '' || p.precio == null || !Admin.isNum(p.precio) || Number(p.precio) < 0) errors.precio = 'Precio ≥ 0. Puede ser decimal.';
    if(p.stock === '' || p.stock == null || !Admin.isInt(p.stock) || Number(p.stock) < 0) errors.stock = 'Stock entero ≥ 0.';
    if(p.stockCritico !== '' && p.stockCritico != null){
      if(!Admin.isInt(p.stockCritico) || Number(p.stockCritico) < 0) errors.stockCritico = 'Stock crítico entero ≥ 0 o vacío.';
    }
    if(!p.categoria) errors.categoria = 'Seleccione categoría.';
    return errors;
  };

  Admin.validateUser = function(u){
    const errors = {};
    if(!Admin.validRUN(u.run)) errors.run = 'RUN inválido. Sin puntos ni guion. Ej: 19011022K';
    if(!u.nombre || !Admin.maxLen(u.nombre, 50)) errors.nombre = 'Nombre requerido. Máx 50.';
    if(!u.apellidos || !Admin.maxLen(u.apellidos, 100)) errors.apellidos = 'Apellidos requeridos. Máx 100.';
    if(!u.correo || !Admin.maxLen(u.correo, 100) || !Admin.validEmailByDomain(u.correo)) errors.correo = 'Correo inválido o dominio no permitido.';
    if(!u.tipo) errors.tipo = 'Seleccione tipo de usuario.';
    if(!u.region) errors.region = 'Seleccione región.';
    if(!u.comuna) errors.comuna = 'Seleccione comuna.';
    if(!u.direccion || !Admin.maxLen(u.direccion, 300)) errors.direccion = 'Dirección requerida. Máx 300.';
    return errors;
  };

  // ===== regions.js =====
  Admin.REGIONES = [
    { nombre: 'Valparaíso', comunas: ['Valparaíso','Viña del Mar','Quilpué','Villa Alemana','Concón'] },
    { nombre: 'Región Metropolitana', comunas: ['Santiago','Maipú','Las Condes','Providencia','Puente Alto'] },
    { nombre: 'Biobío', comunas: ['Concepción','Talcahuano','San Pedro de la Paz','Chiguayante','Los Ángeles'] }
  ];

  // ===== Export/Import helpers =====
  Admin.exportJSON = function(filename, obj){
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    a.remove(); setTimeout(()=>URL.revokeObjectURL(url), 500);
  };
  Admin.importJSON = function(file, cb){
    const reader = new FileReader();
    reader.onload = (e)=>{
      try{
        const data = JSON.parse(e.target.result);
        cb(null, data);
      }catch(err){ cb(err); }
    };
    reader.onerror = (e)=> cb(e);
    reader.readAsText(file);
  };

  global.Admin = Admin;
})(window);
