const listaProductos = document.getElementById("lista-productos");

async function getData() {
    try {
        const response = await fetch("https://my-json-server.typicode.com/CesarCh3721/APIDecor/productos");
        const data = await response.json();
        data.forEach(element => {
            const producto = document.createElement("div");
            producto.className = "producto";

            const img = document.createElement("img");
            img.src = `${element.src}`;
            img.alt = `${element.titulo}`;
            producto.append(img);

            const textoProducto = document.createElement("div");
            textoProducto.className = "texto-producto";

            const titulo = document.createElement("h3");
            titulo.textContent = `${element.titulo}`;
            textoProducto.append(titulo);

            const descripcion = document.createElement("p");
            descripcion.textContent = `${element.descripcion}`;
            textoProducto.append(descripcion);

            const precio = document.createElement("span");
            precio.textContent = `$${element.precio}`;
            textoProducto.append(precio);

            const btnAgregar = document.createElement("a");
            btnAgregar.href = "#";
            btnAgregar.className = "btn agregar-carrito";
            btnAgregar.setAttribute("data-id", `${element.dataId}`);
            btnAgregar.textContent = "Agregar al carrito";
            textoProducto.append(btnAgregar);

            producto.append(textoProducto);
            listaProductos.append(producto);
        });
        eliminarSpinner();
        const car = document.createElement('script');
        car.src = './js/carrito.js';
        document.body.append(car);
    }
    catch{
        eliminarSpinner();
        const mistake = document.createElement("p");
        mistake.textContent="( ´•︵•` ) Error de servidor";
        mistake.style.color="#fb4a50";
        mistake.style.textAlign="center";  
        mistake.style.fontSize="2rem";
        const contenedorProductos=document.querySelector(".nuestros-productos");
        contenedorProductos.append(mistake)
    }
}
function eliminarSpinner(){
    const spinner = document.querySelector(".sk-chase");
    spinner.style.display="none";
}

getData();


