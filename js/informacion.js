// variables 
const inputCorreo = document.getElementById("correo");
const inputPais = document.getElementById("pais");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");
const inputDireccion = document.getElementById("direccion");
const inputCiudad = document.getElementById("ciudad");
const inputTelefono = document.getElementById("telefono");
const BtnContinuarPago = document.getElementById("continuar-pago");

// asignar eventos 
inputCorreo.oninput = verificacion;
inputPais.oninput = verificacion;
inputNombre.oninput = verificacion;
inputApellido.oninput = verificacion;
inputDni.oninput = verificacion;
inputDireccion.oninput = verificacion;
inputCiudad.oninput = verificacion;
inputTelefono.oninput = verificacion;

const informacion = JSON.parse(sessionStorage.getItem("informacion")) || {
        correo: "",
        pais: "",
        nombre: "",
        apellido: "",
        dni: "",
        direccion: "",
        ciudad: "",
        telefono: ""
};
inputCorreo.value = informacion.correo;
inputPais.value = informacion.pais;
inputNombre.value = informacion.nombre;
inputApellido.value = informacion.apellido;
inputDni.value = informacion.dni;
inputDireccion.value = informacion.direccion;
inputCiudad.value = informacion.ciudad;
inputTelefono.value = informacion.telefono;

verificarInformacion();
function verificacion(e) {
    if (e.target.value.trim() === "") {
        mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
        informacion[e.target.id] = "";
        verificarInformacion();
        return;
    }
    if (e.target.id === "correo" && verificarEmail(e.target.value.trim()) === false) {
        mostrarAlerta(`El email no es válido`, e.target.parentElement);
        informacion[e.target.id] = "";
        verificarInformacion();
        return;
    }
    borrarAlerta(e.target.parentElement);
    informacion[e.target.id] = e.target.value.trim();
    verificarInformacion();
}

function mostrarAlerta(mensaje, padre) {
    borrarAlerta(padre);
    const aviso = document.createElement("p");
    aviso.className = "aviso";
    aviso.textContent = mensaje;
    aviso.style.color = "#f48f8f";
    padre.appendChild(aviso);
}
const borrarAlerta=(padre)=>{
    padre.querySelector(".aviso")?.remove();
}
function verificarEmail(email) {
    const expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = expresion.test(email);
    return resultado;
}
function verificarInformacion() {
    if (Object.values(informacion).includes("")) {
        BtnContinuarPago.classList.add("opacity-5");
        BtnContinuarPago.href = "#";
    }
    else {
        BtnContinuarPago.classList.remove("opacity-5");
        BtnContinuarPago.href = "pago.html";
        sessionStorage.setItem("informacion", JSON.stringify(informacion));
    }
}
