const meso = 550;
const pil = 350;
const depi = 450;
const bot = 100;
const basico = new sesiones(10, 5, 0, 10, 3500);
const intermedio = new sesiones(10, 5, 5, 15, 5500);
const premium = new sesiones(20, 10, 10, 30, 8500);
const personalizado = new sesiones(0, 0, 0, 0, 0);

let nombre = prompt("Ingresa tu nombre");
alert("Bienvenido " + nombre);
let edad = parseFloat(prompt("Ingrese su edad"));
let plan;
let total = 0;
const persona1 = new persona(nombre, edad);

persona1.plan = planes();

if (persona1.plan != 0) {
  while (persona1.plan < 0 || persona1.plan > 4) {
    persona1.plan = planes();
  }
}

while (persona1.plan != 0) {
  if (persona1.plan === 4) {
    personalizado.mesoterapia = personal("Mesoterapia");
    personalizado.pilling = personal("Pilling");
    personalizado.botox = personal("Botox");
    personalizado.depilacion = personal("Depilación");
  }

  switch (persona1.plan) {
    case 1:
      alert(
        nombre +
          ", has adquirido:\n\n" +
          basico.mesoterapia +
          " Mesoterapia\n" +
          basico.pilling +
          " Pilling\n" +
          basico.botox +
          " Botox\n" +
          basico.depilacion +
          " Depilación\n\n" +
          "Total: $" +
          basico.precio
      );
      total += basico.precio;

      break;
    case 2:
      alert(
        nombre +
          ", has adquirido:\n\n" +
          intermedio.mesoterapia +
          " Mesoterapia\n" +
          intermedio.pilling +
          " Pilling\n" +
          intermedio.botox +
          " Botox\n" +
          intermedio.depilacion +
          " Depilación\n\n" +
          "Total: $" +
          intermedio.precio
      );
      total += intermedio.precio;
      break;
    case 3:
      alert(
        nombre +
          ", has adquirido:\n\n" +
          premium.mesoterapia +
          " Mesoterapia\n" +
          premium.pilling +
          " Pilling\n" +
          premium.botox +
          " Botox\n" +
          premium.depilacion +
          " Depilación\n\n" +
          "Total: $" +
          premium.precio
      );
      total += premium.precio;
      break;
    case 4:
      personalizado.precio = elegir(
        personalizado.mesoterapia,
        personalizado.pilling,
        personalizado.botox,
        personalizado.depilacion
      );
      alert(
        nombre +
          ", has adquirido:\n\n" +
          personalizado.mesoterapia +
          " Mesoterapia\n" +
          personalizado.pilling +
          " Pilling\n" +
          personalizado.botox +
          " Botox\n" +
          personalizado.depilacion +
          " Depilación\n\n" +
          "Total: $" +
          personalizado.precio
      );
      total += personalizado.precio;
      break;
    default:
      alert("Ese plan no es valido");
  }

  let resp = parseFloat(
    prompt("Desea adquirir un nuevo otro plan?\nMarque\n1. SI\n2. NO")
  );
  if (resp === 1) {
    persona1.plan = planes();
  } else {
    persona1.plan = 0;
  }
  alert("El total de su compra es de: $" + total);
}
alert("Gracias vuelva pronto!");

// objeto persona
function persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.plan = null;
}

// Objeto sesiones

function sesiones(mesoterapia, pilling, botox, depilacion, precio) {
  this.mesoterapia = mesoterapia;
  this.pilling = pilling;
  this.botox = botox;
  this.depilacion = depilacion;
  this.precio = precio;
}

// funcion que almacena la cantidad de sesiones segun la terapia
function personal(terapia) {
  let res = parseFloat(prompt("Ingrese la cantidad de sesiones de " + terapia));
  return res;
}

// Pregunta sobre los planes
function planes() {
  let plan = parseFloat(
    prompt(
      "Ingrese el plan: \n1.Basico\n2.Intermedio\n3.Premium\n4.Personalizado\n0.Salir"
    )
  );
  return plan;
}

function elegir(a, b, c, d) {
  let res = meso * a + pil * b + bot * c + depi * d;
  return res;
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
function alertaPersonalizado() {
  alert(
    "Gracias " + nombre + "\nAgregaste el paquete Personalizado al carrito"
  );
}
