// Contenido completo y corregido para tu archivo contact.js

document.addEventListener('DOMContentLoaded', () => {

    // --- MODAL DE CONTACTO --- //

    const contactModal = document.getElementById("contactModal");
    const contactLink = document.getElementById("contactoLink");
    const closeContactModal = document.getElementById("closeContactModal");
    const contactForm = document.getElementById("contactForm");

    // Valida que los elementos existan antes de agregarles eventos
    if (contactLink && contactModal) {
        // Abrir el modal al hacer clic en "Contacto"
        contactLink.addEventListener("click", (e) => {
            e.preventDefault();
            // CORRECCIÓN: Usamos classList para mostrar el modal
            contactModal.classList.add("is-visible");
        });
    }

    // Función para cerrar el modal
    function cerrarModalContacto() {
        if(contactModal) {
            // CORRECCIÓN: Usamos classList para ocultar el modal
            contactModal.classList.remove("is-visible");
        }
    }

    if (closeContactModal) {
        // Cerrar el modal al hacer clic en la 'X'
        closeContactModal.addEventListener("click", cerrarModalContacto);
    }

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === contactModal) {
            cerrarModalContacto();
        }
    });

    if (contactForm) {
        // Manejar el envío del formulario
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            // Simulación de envío
            alert("¡Gracias por tu mensaje! Te contactaremos pronto.");

            contactForm.reset();
            cerrarModalContacto();
        });
    }
});