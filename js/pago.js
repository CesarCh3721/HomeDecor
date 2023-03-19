
// variables
const inputNombreTarjeta = document.getElementById("nombreTarjeta");
const inputNumTarjeta = document.getElementById("numeroTarjeta");
const inputVencimiento = document.getElementById("vencimiento");
const inputCvv = document.getElementById("cvv");

const botonConfirmar = document.getElementById("confirmar");

// eventos
inputNombreTarjeta.addEventListener("input", validarTarjeta)
inputNumTarjeta.addEventListener("input", validarTarjeta)
inputVencimiento.addEventListener("input", validarTarjeta)
inputCvv.addEventListener("input", validarTarjeta)

tarjeta = {
    nombreTarjeta: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: ""
}
botonConfirmar.addEventListener("click",(e)=>{
    e.preventDefault();
    const confirmacion = document.getElementById("confirmacion");
    confirmacion.reset();
    tarjeta.nombreTarjeta="";
    tarjeta.numeroTarjeta="";
    tarjeta.vencimiento="";
    tarjeta.cvv="";
    verificarInfoTarjeta();

    // Toastify({
    //     text: "Compra finalizada con exito",
    //     duration:1500,
    //     gravity:"bottom",
    //     position: "left",
    //     style: {
    //         background: " #eaff6a",
    //         color:"#000",
    //         padding:"3rem",
    //         fontSize:"2rem",
    //         fontWeight:"900",
    //         textAlign:"center"
    //     }
    // }).showToast();


});
function validarTarjeta(e) {
    if (e.target.value.trim() === "") {
        mostrarAlert(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
        tarjeta[e.target.id] = "";
        verificarInfoTarjeta();
        return;
    }
    eliminarAlert(e.target.parentElement);
    // validar numero
    tarjeta[e.target.id] = e.target.value.trim();
    verificarInfoTarjeta();
    console.log(tarjeta);
}

function mostrarAlert(mensaje, indicador) {
    eliminarAlert(indicador);
    const obs = document.createElement("p");
    obs.id = "observacion";
    obs.textContent = mensaje;
    obs.style.color = "red";
    indicador.appendChild(obs);
}
function eliminarAlert(indicador) {
    const find = indicador.querySelector("#observacion");
    if (find) find.remove();
}
function verificarInfoTarjeta() {
    if (Object.values(tarjeta).includes("")) {
        botonConfirmar.disabled = true;
        botonConfirmar.classList.add("cursor-not");
        botonConfirmar.classList.add("opacity-5");
    }
    else {
        botonConfirmar.disabled = false;
        botonConfirmar.classList.remove("cursor-not");
        botonConfirmar.classList.remove("opacity-5");
    }
}
// verifiacar el numeor de tarjeta 
// funcionen bien las notificaciones 
