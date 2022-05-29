const carritos = document.querySelector("#carrito");
const mostrarCant = document.createElement("span");
const mostrarItems = document.querySelector(".contenedor-carrito");
const items = document.querySelector("#tabla");
const mostrarItem = document.createElement("div");
const popup = document.querySelector("#popup");
const planesVigentes = document.querySelector("#menu-planes");
const $planes = document.querySelector("#planes");
const $sesiones = document.querySelector("#sesiones");
const nombreIngresado = document.querySelector("#nombre");
const mailIngresado = document.querySelector("#email");
const passIngresado = document.querySelector("#password");
const checkbox = document.querySelector("check");
const saludo = document.querySelector("#bienvenida");
const power = document.querySelector("#power");

// Objeto Planes
function planes(
  id,
  tipo,
  cantidad,
  mesoterapia,
  pilling,
  botox,
  depilacion,
  precio
) {
  this.id = id;
  this.tipo = tipo;
  this.cantidad = cantidad;
  this.mesoterapia = mesoterapia;
  this.pilling = pilling;
  this.botox = botox;
  this.depilacion = depilacion;
  this.precio = precio;
}
// // objeto sesiones
function sesiones(id, tipo, cantidad, precio) {
  this.id = id;
  this.tipo = tipo;
  this.cantidad = cantidad;
  this.precio = precio;
}
// array planes
const arrayPlanes = [
  new planes(1, "Plan Basico", 1, 5, 5, 0, 10, 35000),
  new planes(2, "Plan Intermedio", 1, 10, 5, 5, 15, 55000),
  new planes(3, "Plan Premium", 1, 20, 10, 10, 30, 85000),
];
const arraySesiones = [
  new sesiones(4, "Mesoterapia", 1, 3500),
  new sesiones(5, "Pilling", 1, 2000),
  new sesiones(6, "Botox", 1, 4000),
  new sesiones(7, "Depilación", 1, 1500),
];
let totalFinal;
let contador = 0;
let nombre;
let planesElegidos = []; // array para el carrito
const consultaPlan = [...arrayPlanes, ...arraySesiones];
// sumar carrito
function sumarCarrito(array) {
  let total = 0;
  array.forEach((array) => {
    total += array.cantidad * array.precio;
  });

  return total;
}

// Muestro los planes
const mostrarPlanes = () => {
  arrayPlanes.forEach((el) => {
    $planes.innerHTML += `<article class="col-md-3 mt-4 card-planes item me-3">
      <h4 class="text-center">${el.tipo}</h4>
      <h5 class="text-center">$${el.precio}</h5>
      <ul>
      <li>${el.mesoterapia} sesiones de Mesoterapia</li>
      <li>${el.botox} sesiones de Botox</li>
      <li>${el.pilling} sesiones de Pilling</li>
      <li>${el.depilacion} sesiones de Depilación</li>
      </ul>
      <div class="text-center">
      <button class="css-button-retro--sand mb-2 btn${el.id} planes"data-id="${el.id}">Agregar</button></article>
      </div>`;
  });
};
mostrarPlanes();
// Muestro las sesiones
const mostrarSesiones = () => {
  arraySesiones.forEach((el) => {
    $sesiones.innerHTML += `<div class="col-md-2 mt-4 me-3 card-planes item">
          <h4 class="text-center">${el.tipo}</h4>
          <h5 class="text-center">$${el.precio} x sesión</h5>
          <div class="text-center"><button class="css-button-retro--sand mb-2 btn${el.id} planes" data-id="${el.id}">Agregar</button></div>`;
  });
};
mostrarSesiones();

function abrirCarrito(e) {
  if (e.target.matches("#carrito")) {
    if (mostrarItems.style.visibility === "visible") {
      mostrarItems.style.visibility = "hidden";
    } else {
      mostrarItems.style.visibility = "visible";
      mostrarCarrito();
    }
  }
}
function abrirPopup(e) {
  if (e.target.matches("#bienvenida")) {
    popup.classList.add("active");
  }
}
function cerrarPopup(e) {
  if (e.target.matches(".close-btn")) {
    popup.classList.remove("active");
  }
}
function recogerDatos(e) {
  let user;
  if (e.target.matches("#submit")) {
    nombre = nombreIngresado.value;
    user = {
      usuario: nombre,
      email: mailIngresado.value,
      password: passIngresado.value,
    };
    localStorage.setItem("usuario", JSON.stringify(user));
  }
}
function powerAdd() {
  if (saludo.id === "cerrar") {
    power.classList.remove("visually-hidden");
  } else {
    power.classList.add("visually-hidden");
  }
}
function cerrarSesion(e) {
  if (e.target.matches("#power")) {
    saludo.innerHTML = `Ingresar`;
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    planesElegidos = [];
    contador = 0;
    saludo.id = "bienvenida";
    cantidadCarrito(contador);
  }
  mostrarCarrito();
  powerAdd();
}
function agregarCarrito(e) {
  let p;
  if (e.target.matches(".planes")) {
    p = consultaPlan.find((el) => el.id === Number(e.target.dataset.id));
    let resp = itemRepetido(p);
    if (resp) {
      p.cantidad++;
      guardarEnStorage();
      mostrarCarrito();
    } else {
      planesElegidos.push(p);
      contador++;
      mostrarCarrito();
      cantidadCarrito(contador);
      guardarEnStorage();
      Toastify({
        text: "Se agrego correctamente al carrito!",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            " linear-gradient(to right, rgb(20, 20, 20), rgba(0, 0, 0, 0.377))",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
}
function itemRepetido(dato) {
  let encontrado = planesElegidos.find((el) => el.id === dato.id);
  if (encontrado) {
    return true;
  } else {
    return false;
  }
}
function mostrarCarrito() {
  items.innerHTML = "";
  planesElegidos.forEach((el) => {
    items.innerHTML += `<th scope="row text-center">${el.id}</th>
        <td>${el.tipo}</td>
        <td class="text-center"><i class="bi bi-dash-circle resta me-1"data-id="${el.id}"></i> ${el.cantidad} <i class="bi bi-plus-circle suma ms-1"data-id="${el.id}"></i></td>
        <td>$${el.precio}</td>
        <td><i class="bi bi-trash trash"data-id="${el.id}"></i></td>`;
  });

  mostrarItems.appendChild(mostrarItem);
  totalFinal = sumarCarrito(planesElegidos);
  mostrarItem.innerHTML = `<div class="d-flex justify-content-evenly">Total
      <a href="#" class="text-decoration-underline" id="eliminarTodo">Eliminar Todo</a>
      <p>$${totalFinal}</p>
      </div>
      <div class="text-center"><button class="css-button-retro--sand mb-2" id="comprar">Finalizar compra</button></div>`;
}
function quitarCant(e) {
  if (e.target.matches(".resta")) {
    let p = planesElegidos.find((el) => el.id === Number(e.target.dataset.id));
    if (p.cantidad <= 1) {
      p = planesElegidos.findIndex(
        (el) => el.id === Number(e.target.dataset.id)
      );
      planesElegidos.splice(p, 1);
      contador--;
      cantidadCarrito(contador);
      mostrarCarrito();
      guardarEnStorage();
    } else {
      p.cantidad--;
      mostrarCarrito();
      guardarEnStorage();
    }
  }
}
function agregarCant(e) {
  if (e.target.matches(".suma")) {
    const p = planesElegidos.find(
      (el) => el.id === Number(e.target.dataset.id)
    );
    p.cantidad++;
    mostrarCarrito();
    guardarEnStorage();
  }
}

function quitarElemento(e) {
  if (e.target.matches(".trash")) {
    confirmacion(e);
  }
}
function eliminarTodo(e) {
  if (e.target.matches("#eliminarTodo")) {
    localStorage.removeItem("carrito");
    planesElegidos.forEach((el) => (el.cantidad = 1));
    planesElegidos = [];
    contador = 0;
    console.log(contador);
    cantidadCarrito(contador);
    mostrarCarrito();
  }
}
function cantidadCarrito(contador) {
  mostrarCant.innerHTML = `<span>${contador}</span>`;
  carritos.appendChild(mostrarCant);
  contador === 0 && carritos.removeChild(mostrarCant);
}
function recuperarDatoNombre(dato) {
  if (dato) {
    saludo.id = "cerrar";
    saludo.innerHTML = `Bienvenid@ ${dato.usuario}`;
  }
  powerAdd();
}
recuperarDatoNombre(JSON.parse(localStorage.getItem("usuario")));
function recuperarDatoCarrito(dato) {
  if (dato) {
    planesElegidos = dato;
  }
  contador = planesElegidos.length;
  cantidadCarrito(contador);
}

function guardarEnStorage() {
  saludo.id === "cerrar" &&
    localStorage.setItem("carrito", JSON.stringify(planesElegidos));
}
recuperarDatoCarrito(JSON.parse(localStorage.getItem("carrito")));

document.addEventListener("click", (e) => {
  agregarCarrito(e);
  abrirCarrito(e);
  cerrarPopup(e);
  abrirPopup(e);
  recogerDatos(e);
  quitarCant(e);
  agregarCant(e);
  quitarElemento(e);
  eliminarTodo(e);
  cerrarSesion(e);
  comprar(e);
  console.log(e.target);
});

function comprar(e) {
  if (e.target.matches("#comprar")) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Ha realizado una compra exitosa",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.removeItem("carrito");
    planesElegidos.forEach((el) => (el.cantidad = 1));
    planesElegidos = [];
    contador = 0;
    console.log(contador);
    cantidadCarrito(contador);
    mostrarCarrito();
  }
}

function confirmacion(e) {
  Swal.fire({
    title: "Está seguro que desea quitar el articulo?",
    text: "Esta acción no puede deshacerse",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      let p = planesElegidos.find(
        (el) => el.id === Number(e.target.dataset.id)
      );
      p.cantidad = 1;
      p = planesElegidos.findIndex(
        (el) => el.id === Number(e.target.dataset.id)
      );
      planesElegidos.splice(p, 1);
      contador--;
      mostrarCarrito();
      cantidadCarrito(contador);
      guardarEnStorage();
      Swal.fire(
        "Eliminado!",
        "El producto fue eliminado con exito.",
        "success"
      );
    }
  });
}
