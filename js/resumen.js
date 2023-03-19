// local storage
let productosStorage = localStorage.getItem("carrito");
let arrProductos = productosStorage ? JSON.parse(productosStorage) : [];

// eventos
const productos = document.getElementById("productos");
const costosantes = document.getElementById("costos-antes");
const contentTotal=document.getElementById("contenido-total");


mostrarCompras();

function mostrarCompras() {
    arrProductos.forEach((producto) => {
        const flex = document.createElement("div")
        flex.className = "flex";
        productos.appendChild(flex);
        const nombre = document.createElement("p");
        nombre.textContent = `${producto.nombre}`;
        flex.appendChild(nombre);
        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;
        flex.appendChild(precio);
    });
    // subtotal
    const total = arrProductos.reduce((acum, prod) => acum + prod.precio, 0);

    const flex = document.createElement("div")
    flex.className = "flex";
    costosantes.appendChild(flex);

    const subTexto = document.createElement("p");
    subTexto.textContent = "Subtotal";
    flex.appendChild(subTexto);

    const subMonto = document.createElement("p");
    subMonto.textContent = `$${total}`;
    flex.appendChild(subMonto);

    mostrarEnvios(arrProductos.length);
    mostrarMontoTotal(arrProductos.length*70,total);

}
function mostrarEnvios(monto) {
    const flex = document.createElement("div")
    flex.className = "flex";
    costosantes.appendChild(flex);

    const enviosTexto = document.createElement("p");
    enviosTexto.textContent = "Envios";
    flex.appendChild(enviosTexto);

    const enviosMonto = document.createElement("p");
    enviosMonto.textContent = `$${monto*70}`;
    flex.appendChild(enviosMonto);
     
}
function mostrarMontoTotal(envios,tot){
    const div = document.createElement("div")
    div.className = "texto-total";
    contentTotal.appendChild(div);

    const totalTexto = document.createElement("p");
    totalTexto.textContent = "Total";
    div.appendChild(totalTexto);

    const imp=(envios+tot)*0.18;
    const impuestos = document.createElement("span");
    impuestos.textContent = `Incluye $${imp} de impuestos`;
    div.appendChild(impuestos);
    
    const cant=(envios+tot)*1.18;;
    const total = document.createElement("p");
    total.textContent = `$${cant}`;
    contentTotal.appendChild(total);
}
