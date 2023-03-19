// seleccion de los elementos 
const inputNewsletter = document.getElementById("news-email");
const botonNews=document.getElementById("boton-news");
const form=document.getElementById("form-news");

// eventos
inputNewsletter.oninput=verificar;
inputNewsletter.addEventListener("blur",(e)=>{
    eliminarAlertaNews()
    if(e.target.value.trim()==="") {
        e.target.value="";
        return;
    }
});
botonNews.onclick=(e)=>{
    e.preventDefault();
    Toastify({
        text: "¡Felicidades¡ ya estas suscrito al newsletter de Home Decor",
        duration:2500,
        gravity:"bottom",
        position: "right",
        style: {
            background: " #eaff6a",
            color:"#000",
            padding:"3rem",
            fontSize:"2rem",
            fontWeight:"900",
            textAlign:"center"
        }
    }).showToast(); 
    form.reset();
    botonNews.classList.add("opacity-5");
    botonNews.classList.remove("opacity-1");
    botonNews.classList.add("cursor-not");
    botonNews.disabled=true;

};

// funciones
function verificar(e){
    if(e.target.value.trim()==="")
    {
        mostrarAlert(e.target,"El campo es obligatorio");
        botonNews.classList.add("opacity-5");
        botonNews.classList.remove("opacity-1");
        botonNews.classList.add("cursor-not");
        botonNews.disabled=true;
        return;
    }
     if(!validarEmail(e.target.value.trim()))
    {
        mostrarAlert(e.target,"El email no es válido");
        return;
    }
    eliminarAlertaNews();
    botonNews.classList.remove("opacity-5");
    botonNews.classList.add("opacity-1");
    botonNews.classList.remove("cursor-not");
    botonNews.disabled=false;   
}
function mostrarAlert(padre,mensaje){
    eliminarAlertaNews();
    const alerta =document.createElement("p");
    alerta.className="alerta-newsletter"
    alerta.textContent=mensaje;
    alerta.style.backgroundColor="red";
    alerta.style.padding="1rem";
    alerta.style.marginTop="1rem";
    alerta.style.color="#fff ";
    alerta.style.textAlign="center";
    
    padre.parentElement.appendChild(alerta);
}
function eliminarAlertaNews()
{
    const alertaNewsletter=document.querySelector(".alerta-newsletter");
    if(alertaNewsletter) alertaNewsletter.remove();
}
function validarEmail(email){
    const expresion =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const resultado = expresion.test(email);
    return resultado;
}
 