// // objeto planes
const arrayPlanes = [
  new planes(1, "Plan Basico", 1, 5, 5, 0, 10, 35000),
  new planes(2, "Plan Intermedio", 1, 10, 5, 5, 15, 55000),
  new planes(3, "Plan Premium", 1, 20, 10, 10, 30, 85000),
];
const arraySesiones = [
  new sesiones(4, "Mesoterapia", 1, 3500),
  new sesiones(5, "Piling", 1, 2000),
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

// // Muestro los planes almacenados en el array
function mostrarPlanes(array) {
  let texto = "";
  array.forEach((array) => {
    texto += `${array.id}. ${array.tipo} $${array.precio}\n`;
  });
  return texto;
}

// // muestro las caracteristas del plan seleccionado por consola
function planSeleccionado(array, dato) {
  let result = array.find((el) => el.id === dato);
  return result;
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
  tipoPlan["idc"] = idCarrito;
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

// Saludo personalizad
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

const planBasic = document.querySelectorAll(".card-planes")[0];
const planInter = document.querySelectorAll(".card-planes")[1];
const planPrem = document.querySelectorAll(".card-planes")[2];
function msjMostrado(text) {
  let msj = `<p>${text.mesoterapia} - Mesoterapia</p>
<p>${text.botox} - Botox</p>
<p>${text.pilling} - Pilling</p>
<p>${text.depilacion} - Depelación</p>`;
  return msj;
}

planBasic.addEventListener("click", () => {
  if (planBasic.style.height === "100%") {
    planBasic.style.height = "85px";
  } else {
    planBasic.style.height = "100%";
  }
});

planInter.addEventListener("click", () => {
  if (planInter.style.height === "100%") {
    planInter.style.height = "85px";
  } else {
    planInter.style.height = "100%";
  }
});
planPrem.addEventListener("click", () => {
  if (planPrem.style.height === "100%") {
    planPrem.style.height = "85px";
  } else {
    planPrem.style.height = "100%";
  }
});

const agregar1 = document.querySelector("#planBasico");
const agregar2 = document.querySelector("#planInter");
const agregar3 = document.querySelector("#planPrem");
const confirmacion = document.createElement("div");
confirmacion.innerHTML = `<div class="confirmacion"><p>Se agrego correctamente!</p></div>`;
agregar1.addEventListener(
  "click",
  () => {
    let tipoPlan = planSeleccionado(consultaPlan, 1);
    carrito(tipoPlan);
    planBasic.appendChild(confirmacion);
    contador++;
    cantidadCarrito(contador);
  },
  { once: true }
);
agregar2.addEventListener(
  "click",
  () => {
    let tipoPlan = planSeleccionado(consultaPlan, 2);
    carrito(tipoPlan);
    planInter.appendChild(confirmacion);
    contador++;
    cantidadCarrito(contador);
  },
  { once: true }
);
agregar3.addEventListener(
  "click",
  () => {
    let tipoPlan = planSeleccionado(consultaPlan, 3);
    carrito(tipoPlan);
    planPrem.appendChild(confirmacion);
    contador++;
    cantidadCarrito(contador);
  },
  { once: true }
);
