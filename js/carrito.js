class Mueble {
  constructor(imagen, nombre, precio, id) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.cantidad = 1;
  }
}

// local storage
let productosStorage = localStorage.getItem("carrito");
let arrProductos = productosStorage ? JSON.parse(productosStorage) : [];

const carrito = document.getElementById("carrito");
const shoppingCart = document.querySelector('.shopping-cart');

const shoppingBtn = document.querySelector('#shopping-cart-btn');
shoppingBtn.addEventListener('click', (e) => {
  e.preventDefault();
  shoppingCart.classList.toggle('active');
  if (arrProductos.length === 0) {
    limpiarCarrito();
    eliminarTotal();
    mostrarCarritoVacio();
  }
  else {
    mostrarProductos();
  }
});
function mostrarCarritoVacio() {
  const existe = document.querySelector(".carrito-vacio");
  if (!existe) {
    const vacio = document.createElement("p");
    vacio.className = "carrito-vacio";
    if (!localStorage.getItem("carrito")) {
      vacio.textContent = "Su carrito esta vacio 😔";
      carrito.append(vacio);
      eliminarTotal();
    } else {
      vacio.textContent = "Aún no ha agregado productos al carrito 😊";
      carrito.append(vacio);
    }
  }
}

const btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");

btnAgregarCarrito.forEach((btn) => {

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const idProducto = e.target.getAttribute("data-id");

    const elementoSeleccionado = document.querySelector(`.agregar-carrito[data-id="${idProducto}"]`).parentElement.parentElement;
    console.log(elementoSeleccionado)
    const productoExist = arrProductos.find((element) => element.id === idProducto);
    if (productoExist) {
      productoExist.cantidad++;
    }
    else {
      const imagen = elementoSeleccionado.querySelector(".producto img").src;
      const nombre = elementoSeleccionado.querySelector(".texto-producto h3").textContent;
      const precio = parseInt(elementoSeleccionado.querySelector(".texto-producto span").textContent.replace("$", ""));
      const product = new Mueble(imagen, nombre, precio, idProducto);
      arrProductos.push(product);
    }
    const name = elementoSeleccionado.querySelector(".texto-producto h3").textContent;
    const notificacion = Toastify({
      text: `${name} 
      agregado al carrito`,
      duration: 2000,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right,rgb(0,176,155),rgb(150,201,61))",
        transform:"translate(0px,0px)",
        color: "#fff",
        padding: "1.5rem",
        fontSize: "2rem",
        fontWeight: "900",
        textAlign: "center"
      }
    });
    notificacion.showToast()
    mostrarProductos();
  });
});


function mostrarProductos() {
  limpiarCarrito();
  arrProductos.forEach((producto) => {

    const box = document.createElement("div");
    box.className = "box";

    const img = document.createElement("img");
    img.src = `${producto.imagen}`;
    box.appendChild(img);

    const contenido = document.createElement("div");
    contenido.className = "contenido";

    const nombre = document.createElement("h3");
    nombre.textContent = `${producto.nombre}`;
    contenido.appendChild(nombre);

    const precio = document.createElement("span");
    precio.className = "precio";
    precio.textContent = `$${producto.precio}`;
    contenido.appendChild(precio);

    const cantidad = document.createElement("span");
    cantidad.className = "cantidad";
    cantidad.textContent = `${producto.cantidad} und`;
    contenido.appendChild(cantidad);
    box.appendChild(contenido);

    const data = document.createElement("i");
    data.innerHTML = `<i data-id="${producto.id}" class="fas fa-trash"></i>`;
    box.appendChild(data);
    carrito.appendChild(box);

    //  eliminar producto de carrito
    data.addEventListener("click", (e) => {
      eliminarProducto(e.target.getAttribute("data-id"));
      let notificacion = Toastify({
        text: `${producto.nombre} eliminado`,
        duration: 1200,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,rgb(255,95,109),rgb(255,195,113))",
          transform:"translate(0px,0px)",
          color: "#fff",
          padding: "1rem",
          fontSize: "2rem",
          fontWeight: "900",
          textAlign: "center"
        }
      });
      notificacion.showToast()
    });


  });
  mostrarTotal();
  localStorage.setItem("carrito", JSON.stringify(arrProductos));
}
function mostrarTotal() {
  const cantidad = arrProductos.reduce((acum, element) => acum + element.precio * element.cantidad, 0);
  const total = document.querySelector(".total");
  if (!total) {
    const p = document.createElement("p");
    p.className = "total";
    p.textContent = `total $${cantidad}`;
    shoppingCart.appendChild(p);
  }
  else total.textContent = `total $${cantidad}`;
  const finCompra = document.querySelector(".finalizar-compra");
  if (!finCompra) {
    const finalCompra = document.createElement("a");
    finalCompra.href = "informacion.html";
    finalCompra.className = "btn finalizar-compra";
    finalCompra.textContent = "Finalizar Compra";
    shoppingCart.appendChild(finalCompra);
  }
}
function limpiarCarrito() {
  while (carrito.children.length !== 0) {
    carrito.firstChild.remove();
  }
}
function eliminarProducto(id) {

  arrProductos = arrProductos.filter(el => el.id !== id);
  localStorage.setItem("carrito", JSON.stringify(arrProductos));
  limpiarCarrito();
  if (arrProductos.length === 0) {
    mostrarCarritoVacio();
    eliminarTotal();
  }
  else {
    mostrarProductos();
  }
}
function eliminarTotal() {
  const totalPagar = document.getElementsByClassName("total");
  while (totalPagar.length > 0) {
    totalPagar[0].remove();
  }
  const finalCompra = document.getElementsByClassName("finalizar-compra");
  while (finalCompra.length > 0) {
    finalCompra[0].remove();
  }
}