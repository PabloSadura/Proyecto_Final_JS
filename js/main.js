// objeto planes
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
alert("Abrir la consola para ver los planes y sesiones..");

let nombre = datosPersona(); // pido el nombre del usuario

mostrarPlanes(consultaPlan);
elegir = selectPlan(consultaPlan.length);
if (elegir != 0) {
  while (elegir != 0) {
    idPlan = planSeleccionado(consultaPlan, elegir);
    if (elegir > 3 && elegir < 8) {
      sesionesAgregadas(idPlan);
    }
    let agregar = confirm("Desea agregarlo al carrito? Aceptar - Cancelar");
    if (agregar === true) {
      carrito(idPlan);
      mostrarAgregados(planesElegidos);
      contador++;
    }
    let agregarOtro = confirm("Desea seguir comprando? Aceptar - Cancelar");
    if (agregarOtro === true) {
      mostrarPlanes(consultaPlan);
      elegir = selectPlan(consultaPlan.length);
    } else {
      elegir = 0;
    }
  }
  totalFinal = sumarCarrito(planesElegidos, contador);
  let conf = confirm("Desea ver su carrito? Aceptar - Cancelar");
  if (conf === true) {
    mostrarAgregados(planesElegidos);
  }
  // Eliminar items
  let quitar = confirm(
    "Desea quitar algun elemento del carrito? Aceptar - Cancelar"
  );
  if (quitar === true) {
    mostrarAgregados(planesElegidos);
    let num = parseFloat(
      prompt("Elegir un numero para eliminar o 0 para eliminar todos")
    );
    quitarCarrito(num - 1);
    contador--;
    totalFinal = sumarCarrito(planesElegidos, contador);
    if (num === 0) {
      quitarTodo();
      contador = 0;
      totalFinal = sumarCarrito(planesElegidos, contador);
    }
  }
  let abonar = confirm("Desea abonar, oprima Aceptar.");
  if (abonar === true) {
    mostrarAgregados(planesElegidos);
    alert("El monto a abonar es de: $" + totalFinal);
  }
}

alert("Gracias por visitarnos, vuelva pronto!");

console.log(planesElegidos);

// Pido el dato de la persona
function datosPersona() {
  dato = prompt("Ingrese su nombre");
  alert("Bienvenido " + dato);
  return dato;
}

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
// objeto sesiones
function sesiones(id, tipo, cantidad, precio) {
  this.id = id;
  this.tipo = tipo;
  this.cantidad = cantidad;
  this.precio = precio;
}

// Muestro los planes almacenados en el array
function mostrarPlanes(array) {
  array.forEach((array) =>
    console.log(array.id + ". " + array.tipo + " $" + array.precio)
  );
  console.log("0. Salir");
}
// seleccionar plan
function selectPlan(tamanio) {
  let tipoPlan = parseFloat(
    prompt("Ingrese el n° del plan que desea consultar (mostrado por consola)")
  );
  while (tipoPlan < 0 || tipoPlan > tamanio) {
    tipoPlan = parseFloat(
      prompt(
        "Ingrese el n° del plan que desea consultar (mostrado por consola)"
      )
    );
  }
  return tipoPlan;
}

// muestro las caracteristas del plan seleccionado por consola
function planSeleccionado(array, dato) {
  let result = array.find((el) => el.id === dato);
  return result;
}
// agrego sesiones al plan elegido
function sesionesAgregadas(array) {
  array.cantidad = parseFloat(prompt("Ingrese la cantidad de sesiones"));
}
// sumar carrito
function sumarCarrito(array, dato) {
  let total = 0;
  array.forEach((array) => {
    total += array.cantidad * array.precio;
  });
  return total;
}

// Carrito de compras
function carrito(tipoPlan) {
  idCarrito++;
  tipoPlan["idc"] = idCarrito;
  planesElegidos.push(tipoPlan);
  return planesElegidos;
}

// quitar elementos del carrito
function quitarCarrito(num) {
  planesElegidos.splice(num, 1);
}
// funcion para quitar todos los elementos
function quitarTodo() {
  planesElegidos.splice(0);
  alert("El carrito se encuentra vacio");
}
// muestro los planes agregados al carrito
function mostrarAgregados(planesElegidos) {
  console.log("Carrito de compras");
  planesElegidos.forEach((element) => {
    console.log(
      "ID: " +
        element.idc +
        ". " +
        element.tipo +
        " $ " +
        element.cantidad * element.precio
    );
  });
}

// Funciones onclic
function alertaBasico() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Básico al carrito");
}
function alertaIntermedio() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Intermedio al carrito");
}
function alertaPremium() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Premium al carrito");
}
