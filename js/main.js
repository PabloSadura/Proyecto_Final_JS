const meso = 40;
const pil = 50;
const depi = 20;
const bot = 10;
const basico = new sesiones(10, 5, 0, 10, 500);
const intermedio = new sesiones(10, 5, 5, 15, 1500);
const premium = new sesiones(20, 10, 10, 30, 3500);
const personalizado = new sesiones(0, 0, 0, 0, 0);

let nombre = prompt("Ingresa tu nombre");
alert("Bienvenido " + nombre);

let edad = prompt("Ingrese su edad");
if (edad < 18) {
  alert("Ud es menor de edad no puede comprar en este sitio");
} else {
  const persona1 = new persona(nombre, edad);

  persona1.plan = parseFloat(
    prompt(
      "Ingrese el plan: \n1.Basico\n2.Intermedio\n3.Premium\n4.Personalizado"
    )
  );
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
          ", has adquirido\n" +
          basico.mesoterapia +
          " Mesoterapia\n" +
          basico.pilling +
          " Pilling\n" +
          basico.botox +
          " Botox\n" +
          basico.depilacion +
          " Depilación\n" +
          "Total: $" +
          basico.precio
      );
      break;
    case 2:
      alert(
        nombre +
          ", has adquirido\n" +
          intermedio.mesoterapia +
          " Mesoterapia\n" +
          intermedio.pilling +
          " Pilling\n" +
          intermedio.botox +
          " Botox\n" +
          intermedio.depilacion +
          " Depilación\n" +
          "Total: $" +
          intermedio.precio
      );
      break;
    case 3:
      alert(
        nombre +
          ", has adquirido\n" +
          premium.mesoterapia +
          " Mesoterapia\n" +
          premium.pilling +
          " Pilling\n" +
          premium.botox +
          " Botox\n" +
          premium.depilacion +
          " Depilación\n" +
          "Total: $" +
          premium.precio
      );
      break;
    case 4:
      personalizado.precio =
        meso * personalizado.mesoterapia +
        pil * personalizado.pilling +
        bot * personalizado.botox +
        depi * personalizado.depilacion;
      alert(
        nombre +
          ", has adquirido\n" +
          personalizado.mesoterapia +
          " Mesoterapia\n" +
          personalizado.pilling +
          " Pilling\n" +
          personalizado.botox +
          " Botox\n" +
          personalizado.depilacion +
          " Depilación\n" +
          "Total: $" +
          personalizado.precio
      );
      break;
    default:
      alert("Ese plan no es valido");
  }
}
alert("Gracias por su compra!");

function persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.plan = null;
}

function sesiones(mesoterapia, pilling, botox, depilacion, precio) {
  this.mesoterapia = mesoterapia;
  this.pilling = pilling;
  this.botox = botox;
  this.depilacion = depilacion;
  this.precio = precio;
}

function personal(terapia) {
  let res = parseFloat(prompt("Ingrese la cantidad de sesiones de " + terapia));
  return res;
}

function alertaBasico() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Básico al carrito");
}
function alertaIntermedio() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Intermedio al carrito");
}
function alertaPremium() {
  alert("Gracias " + nombre + "\nAgregaste el paquete Premium al carrito");
}
