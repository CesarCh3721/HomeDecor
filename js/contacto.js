// seleccionar los elementos 
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const formulario = document.querySelector(".form-contacto");
const botonSubmit = document.getElementById("btn-submit");
const botonReset = document.getElementById("btn-reset");
// asignar eventos 
inputNombre.oninput = validar;
inputEmail.oninput = validar;
mensaje.oninput = validar;

botonReset.addEventListener("click", (e) => {
    e.preventDefault();
    limpiarMails();
    const observacion = formulario.querySelectorAll(".mistake");
    observacion.forEach(elemento => elemento.remove());
    formulario.reset();
    verificarMails();
})
const mails = {
    nombre: "",
    email: "",
    mensaje: ""
}
botonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    Toastify({
        text: "Correo enviado",
        duration: 2500,
        gravity: "bottom",
        position: "center",
        style: {
            background: " #eaff6a",
            color: "#000",
            padding: "3rem",
            fontSize: "2rem",
            fontWeight: "900",
            textAlign: "center"
        }
    }).showToast();
    formulario.reset();
    limpiarMails();
    deshabilitarSubmit();
});
// funciones
function validar(e) {
    if (e.target.value.trim() === "") {
        mostrarAdvertencia(`El ${e.target.id} es obligatorio`, e.target.parentElement);
        mails[e.target.id] = "";
        verificarMails();
        return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
        mostrarAdvertencia("el email no es valido", e.target.parentElement)
        mails[e.target.id] = "";
        verificarMails();
        return;
    }
    borrarAdvertencia(e.target.parentElement);
    mails[e.target.id] = e.target.value.trim().toLowerCase();
    verificarMails();
}
function mostrarAdvertencia(mensajeError, padre) {
    borrarAdvertencia(padre)
    const error = document.createElement("p");
    error.textContent = mensajeError;
    error.className = "mistake";
    padre.appendChild(error);
}
const borrarAdvertencia=(padre)=> {
    padre.querySelector(".mistake")?.remove();
}
function validarEmail(email) {
    const expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = expresion.test(email);
    return resultado;
}
function verificarMails() {
    Object.values(mails).includes("") ? deshabilitarSubmit() : habilitarSubmit();
}
function limpiarMails() {
    mails.nombre = "";
    mails.email = "";
    mails.mensaje = "";
}
function deshabilitarSubmit() {
    botonSubmit.classList.add('cursor-not');
    botonSubmit.classList.add('opacity-5');
    botonSubmit.disabled = true;
}
function habilitarSubmit() {
    botonSubmit.classList.remove('cursor-not');
    botonSubmit.classList.remove('opacity-5');
    botonSubmit.disabled = false;
}