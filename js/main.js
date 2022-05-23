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
const consultaPlan = arrayPlanes.concat(arraySesiones);
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
    $planes.innerHTML += `<div class="col-md-3 mt-4 card-planes">
    <h4 class="text-center">${el.tipo}</h4>
    <h5 class="text-center">$${el.precio}</h5>
    <ul>
    <li>${el.mesoterapia} sesiones de Mesoterapia</li>
    <li>${el.botox} sesiones de Botox</li>
    <li>${el.pilling} sesiones de Pilling</li>
    <li>${el.depilacion} sesiones de Depilación</li>
    </ul>
    <div class="text-center">
    <button class="btn btn${el.id}">Agregar</button></div>
    </div>`;
  });
};
mostrarPlanes();
// Muestro las sesiones
const mostrarSesiones = () => {
  arraySesiones.forEach((el) => {
    $sesiones.innerHTML += `<div class="col-md-2 mt-4 me-1 card-planes">
        <h4 class="text-center">${el.tipo}</h4>
        <h5 class="text-center">$${el.precio} x sesión</h5>
        <div class="text-center"><button class="btn btn${el.id}">Agregar</button></div>`;
  });
};
mostrarSesiones();
function itemRepetido(idElegido) {
  let result = planesElegidos.find((el) => el.id === idElegido);
  return result;
}
// agrego planes al carrito
consultaPlan.forEach((listas, index) => {
  document.querySelector(`.btn${index + 1}`).addEventListener("click", () => {
    let result = itemRepetido(index + 1);
    if (!result) {
      carrito(listas);
      contador++;
      cantidadCarrito(contador);
    } else {
      result.cantidad++;
    }
  });
  mostrarCarrito();
  agregarCarritoStorage();
});
// listener generales
document.addEventListener("click", (e) => {
  recogerDatos(e);
  abrirCarrito(e);
  quitarCant(e);
  agregarCant(e);
  quitarElemento(e);
  eliminarTodo(e);
  cerrarSesion(e);
  abrirPopup(e);
  cerrarPopup(e);
  console.log(e.target);
});
// cambiar funcion carrito para que cuente lo que hay en el JSON
function cantidadCarrito(contador) {
  mostrarCant.innerHTML = `<span>${contador}</span>`;
  carritos.appendChild(mostrarCant);
}
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
// Mostrar carrito que esta almacenado en JSON
function mostrarCarrito() {
  items.innerHTML = "";
  if (saludo.id === "cerrar") {
    let copia = traerCarritoStorage();
    if (copia !== 0) {
      planesElegidos = traerCarritoStorage();
      contador = cantidadStorage();
      cantidadCarrito(contador);
    }
  }
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
    </div>`;
}

function quitarCant(e) {
  if (e.target.matches(".resta")) {
    const p = planesElegidos.find(
      (el) => el.id === Number(e.target.dataset.id)
    );
    if (p.cantidad <= 1) {
      mostrarCarrito();
    } else {
      p.cantidad--;
      mostrarCarrito();
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
  }
}
function quitarElemento(e) {
  if (e.target.matches(".trash")) {
    let p = planesElegidos.find((el) => el.id === Number(e.target.dataset.id));
    p = planesElegidos.filter((item) => item.id !== p.id);
    planesElegidos = p;
    contador--;
    mostrarCarrito();
    cantidadCarrito(contador);
  }
  agregarCarritoStorage();
}
function eliminarTodo(e) {
  if (e.target.matches("#eliminarTodo")) {
    planesElegidos = [];
    contador = 0;
    mostrarCarrito();
    cantidadCarrito(contador);
  }
}
// funciones para abrir y cerrar popup
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
// Recoger datos del login
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

// funcion para activar el power de cierra de sesion
function powerAdd() {
  if (saludo.id === "cerrar") {
    power.classList.remove("visually-hidden");
  } else {
    power.classList.add("visually-hidden");
  }
}
function recuperarDato(dato) {
  if (dato) {
    saludo.id = "cerrar";
    saludo.innerHTML = `Bienvenid@ ${dato.usuario}`;
  }
  powerAdd();
}
recuperarDato(JSON.parse(localStorage.getItem("usuario")));

function cerrarSesion(e) {
  if (e.target.matches("#power")) {
    saludo.innerHTML = `Ingresar`;
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    planesElegidos = [];
    contador = 0;
    cantidadCarrito(contador);
    saludo.id = "bienvenida";
  }
  mostrarCarrito();
  powerAdd();
}
function traerCarritoStorage() {
  let carritoCopy = JSON.parse(localStorage.getItem("carrito"));

  return carritoCopy;
}

// // Carrito de compras
function carrito(tipoPlan) {
  planesElegidos.push(tipoPlan);
}
function agregarCarritoStorage() {
  if (saludo.id === "cerrar") {
    if (planesElegidos.length === 0) {
    } else {
      localStorage.setItem("carrito", JSON.stringify(planesElegidos));
    }
  }
}
function cantidadStorage() {
  let carrito = traerCarritoStorage();
  let cont = carrito.length;
  return cont;
}
