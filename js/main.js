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
// // Carrito de compras
function carrito(tipoPlan) {
  planesElegidos.push(tipoPlan);
}

// Muestro la cantidad que hay en el carrito
const carritos = document.querySelector("#carrito");
const mostrarCant = document.createElement("span");

// mostrar carrito con productos
const mostrarItems = document.querySelector(".contenedor-carrito");
const items = document.querySelector("#tabla");
const mostrarItem = document.createElement("div");

const planesVigentes = document.querySelector("#menu-planes");
const $planes = document.querySelector("#planes");
const $sesiones = document.querySelector("#sesiones");

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
});

// listener generales
document.addEventListener("click", (e) => {
  abrirCarrito(e);
  quitarCant(e);
  agregarCant(e);
  quitarElemento(e);
  eliminarTodo(e);
});

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

function mostrarCarrito() {
  items.innerHTML = "";
  planesElegidos.forEach((el) => {
    items.innerHTML += `<th scope="row text-center">${el.id}</th>
      <td>${el.tipo}</td>
      <td class="text-center"><input type="submit" value="-" class="btn-carrito me-1 resta" data-id="${el.id}">  ${el.cantidad}  <input type="submit" value="+" class="btn-carrito ms-1 suma" data-id="${el.id}"></td>
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
}
function eliminarTodo(e) {
  if (e.target.matches("#eliminarTodo")) {
    planesElegidos.splice(0);
    contador = 0;
    mostrarCarrito();
    cantidadCarrito(contador);
  }
}
