// // objeto planes
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

let tamanio;
let idPlan;
let idCarrito = 0;
let totalFinal;
let contador = 0;
let planesElegidos = []; // array para el carrito
const consultaPlan = arrayPlanes.concat(arraySesiones);
let elegir = 0;

// // Pido el dato de la persona
function datosPersona() {
  dato = prompt("Ingrese su nombre");
  // alert("Bienvenido " + dato);
  return dato;
}

// // Objeto Planes
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

// // agrego sesiones al plan elegido
function sesionesAgregadas(array) {
  array.cantidad = parseFloat(prompt("Ingrese la cantidad de sesiones"));
}
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
  idCarrito++;
  planesElegidos.push(tipoPlan);
}

// // quitar elementos del carrito
// function quitarCarrito(num) {
//   planesElegidos.splice(num, 1);
// }
// // funcion para quitar todos los elementos
// function quitarTodo() {
//   planesElegidos.splice(0);
//   // alert("El carrito se encuentra vacio");
// }

// Saludo personalizado
let nombre = prompt("Ingrese su nombre");
const ingreso = document.querySelector("#nombre");
const mensaje = document.createElement("p");
mensaje.innerHTML = `<p>Hola ${nombre}</p>`;
ingreso.appendChild(mensaje);

// Muestro la cantidad que hay en el carrito
const carritos = document.querySelector("#carrito");
const mostrarCant = document.createElement("span");
function cantidadCarrito(contador) {
  mostrarCant.innerHTML = `<span>${contador}</span>`;
  carritos.appendChild(mostrarCant);
}
const d = document;
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

// agrego planes al carrito
consultaPlan.forEach((listas, index) => {
  document.querySelector(`.btn${index + 1}`).addEventListener("click", () => {
    carrito(listas);
    contador++;
    cantidadCarrito(contador);
  });
});
