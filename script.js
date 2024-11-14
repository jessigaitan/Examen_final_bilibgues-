// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("loginBtn");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón, abre el modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier parte fuera del modal, también lo cierra
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const contenedorProductos = document.getElementById("productos-container");
const categoriaSelect = document.getElementById("categoria-select");

// Función para generar las tarjetas de productos
function mostrarProductos(category = "salud") {
    console.log(category);

    // Filtrar productos por categoría
    let productByCategory = productos.filter((producto) => producto.categoria[0] === category);
    console.log(productByCategory);

    // Limpiar el contenedor antes de agregar nuevos productos
    contenedorProductos.innerHTML = "";

    // Verificar si hay productos en la categoría
    if (productByCategory.length === 0) {
        contenedorProductos.innerHTML = `<p>No hay productos disponibles en la categoría "${category}".</p>`;
        return;
    }

    // Crear tarjetas de productos
    productByCategory.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-md-4", "mb-4");

        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body mt-3 p-3 d-flex flex-column justify-content-end">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                    <p class="card-text"><strong>Stock:</strong> ${producto.stock.toLocaleString('es-CO')} unidades</p>
                    <p class="card-text"><strong>Categoría:</strong> ${producto.categoria.join(", ")}</p>
                   
                    <div class="d-flex align-items-end">
                        <a href="#" class="btn btn-primary ms-auto">Agregar</a>
                    </div>
                </div>
            </div>
        `;

        // Agregar la tarjeta al contenedor principal
        contenedorProductos.appendChild(tarjeta);
    });
}

// Función para manejar el cambio de categoría
function cambiarCategoria() {
    const category = categoriaSelect.value;
    mostrarProductos(category);
}

// Event listener para el cambio de categoría
categoriaSelect.addEventListener("change", cambiarCategoria);

// Llamar a la función para mostrar los productos al cargar
mostrarProductos();



// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no está, agregarlo al carrito
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    carrito = carrito.filter(item => item.nombre !== nombreProducto);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Limpiar el contenedor del carrito
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";

    // Mostrar productos en el carrito
    carrito.forEach(item => {
        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("carrito-item");

        itemCarrito.innerHTML = `
            <p>${item.nombre} - Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
        `;

        contenedorCarrito.appendChild(itemCarrito);
    });

    // Mostrar total
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalCarrito = document.createElement("div");
    totalCarrito.innerHTML = `<strong>Total: ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong>`;
    contenedorCarrito.appendChild(totalCarrito);

    // Botón de realizar pago
    const botonPago = document.createElement("button");
    botonPago.classList.add("btn", "btn-primary");
    botonPago.innerText = "Realizar Pago";
    botonPago.onclick = realizarPago;
    contenedorCarrito.appendChild(botonPago);
}

// Función para realizar el pago
function realizarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No se puede realizar el pago.");
        return;
    }
    alert("Pago realizado con éxito.");
    // Aquí puedes agregar más lógica para procesar el pago si es necesario
}

// Modificar la función de agregar para que use la nueva función
function mostrarProductos(category = "salud") {
    console.log(category);

    let productByCategory = productos.filter((producto) => producto.categoria[0] === category);
    console.log(productByCategory);

    contenedorProductos.innerHTML = "";

    if (productByCategory.length === 0) {
        contenedorProductos.innerHTML = `<p>No hay productos disponibles en la categoría "${category}".</p>`;
        return;
    }

    productByCategory.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-md-4", "mb-4");

        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body mt-3 p-3 d-flex flex-column justify-content-end">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                    <p class="card-text"><strong>Stock:</strong> ${producto.stock.toLocaleString('es-CO')} unidades</p>
                    <p class="card-text"><strong>Categoría:</strong> ${producto.categoria.join(", ")}</p>
                   
                    <div class="d-flex align-items-end">
                        <button class="btn btn-primary ms-auto" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar</button>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}

// Event listener para el cambio de categoría
categoriaSelect.addEventListener("change", cambiarCategoria);

// Llamar a la función para mostrar los productos al cargar
mostrarProductos();
