const carritos = document.querySelector("#carrito");
const mostrarCant = document.createElement("span");
const mostrarItems = document.querySelector(".contenedor-carrito");
const items = document.querySelector("#tabla");
const mostrarItem = document.createElement("div");
const popup = document.querySelector("#popup");
const planesVigentes = document.querySelector("#menu-planes");
const nombreIngresado = document.querySelector("#nombre");
const mailIngresado = document.querySelector("#email");
const passIngresado = document.querySelector("#password");
const checkbox = document.querySelector("check");
const saludo = document.querySelector("#bienvenida");
const power = document.querySelector("#power");
const productos = document.querySelector("#productos");
const credito = document.querySelector(".credito");
const tarjeta_credito = document.querySelector("#tarjeta");
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

function abrirPopup(e) {
  e.target.matches("#bienvenida") && popup.classList.add("active");
}
function cerrarPopup(e) {
  e.target.matches(".close-btn") && popup.classList.remove("active");
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
  saludo.id === "cerrar"
    ? power.classList.remove("visually-hidden")
    : power.classList.add("visually-hidden");
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

function mostrarCarrito() {
  productos.innerHTML = "";
  planesElegidos.forEach((el) => {
    productos.innerHTML += `<div class="m-4 p-4 border rounded-3 shadow d-flex justify-content-evenly "><div>#${el.id}</div><div>${el.tipo}</div>
        <div class="text-center ms-4"><i class="bi bi-dash-circle resta me-1"data-id="${el.id}"></i> ${el.cantidad} <i class="bi bi-plus-circle suma ms-1"data-id="${el.id}"></i></div>
        <div class="ms-4">$${el.precio}</div>
        <div><i class="bi bi-trash trash ms-4"data-id="${el.id}"></i></div</div>`;
  });
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
      guardarEnStorage();
    } else {
      p.cantidad--;
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
    guardarEnStorage();
  }
}

function quitarElemento(e) {
  e.target.matches(".trash") && confirmacion(e);
}
function eliminarTodo(e) {
  if (e.target.matches("#eliminarTodo")) {
    if (contador) {
      Swal.fire({
        title: "Esta seguro que desea eliminar todos los productos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("carrito");
          planesElegidos.forEach((el) => (el.cantidad = 1));
          planesElegidos = [];
          contador = 0;
          console.log(contador);
          cantidadCarrito(contador);
          Swal.fire(
            "Eliminado!",
            "Se han eliminado todos los productos.",
            "success"
          );
        }
      });
    } else {
      Swal.fire("No hay elementos en el carrito");
    }
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
function comprar(e) {
  if (e.target.matches("#comprar")) {
    Swal.fire({
      title: "Esta seguro que desea realizar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, comprar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("carrito");
        planesElegidos.forEach((el) => (el.cantidad = 1));
        planesElegidos = [];
        contador = 0;
        console.log(contador);
        cantidadCarrito(contador);
        mostrarCarrito();
        Swal.fire("Felicitaciones!", "Compra realizada con éxito.", "success");
      }
    });
  }
}

function confirmacion(e) {
  Swal.fire({
    title: "Está seguro que desea quitar el producto?",
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
mostrarCarrito();
document.addEventListener("click", (e) => {
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
  tarjeta(e);
  efectivo(e);
});

function tarjeta(e) {
  if (e.target.matches("#tarjeta")) {
    credito.innerHTML = `
        <div class="box_card mt-4">
                <div class="tarjeta_credito">
                  <div id="tipo_tarjeta">
                    <img
                      src="../img/tarjeta-de-credito.png"
                      alt=""
                      class="mt-1 ms-3"
                    />
                  </div>
                  <p id="numero_tarjeta" class="text-center fs-4 mt-2 fw-bolder">
                  **** **** **** ****
                  </p>
                  <div class="d-flex justify-content-evenly">
                    <p id="nombre_apellido" class="fw-bolder">***** *******</p>
                    <p id="dni" class="fw-bolder">********</p>
                  </div>
                  <div class="fechas d-flex justify-content-evenly">
                    <div id="fecha_desde" class="fw-bolder">
                      <p>Desde: <span id="desde">**/**</span></p>
                    </div>
                    <p id="fecha_hasta" class="fw-bolder">
                      <p>Hasta: <span id="hasta">**/**</span></p></p>
                  </div>
                </div>
              </div>
              <div class="text-center mt-4">
                <h5>Ingrese los datos de la tarjeta</h5>
              </div>
              <div>
              <label for="name" class="ms-3"
                >Nombre y Apellido:
                <input
                  type="text"
                  name="name"
                  id="name_target"
                  class="ms-4 border-bottom border-top-0 border-start-0 border-end-0"
                />
              </label>
              <label for="name" class="ms-3"
                >D.N.I.:
                <input
                  type="text"
                  name="dni"
                  id="dni_target"
                  class="ms-4 border-bottom border-top-0 border-start-0 border-end-0"
                />
              </label>
              </div>
              <div>
              <label for="number" class="ms-3"
                >N° de tarjeta:
                <input
                  type="number"
                  name="number"
                  id="numbers"
                  class="ms-4 border-bottom border-top-0 border-start-0 border-end-0"
                />
              </label>
              </div>
              <div class="d-flex">
              <label for="date_desde" class="ms-3"
                >Fecha de Desde:
                <input
                  type="number"
                  name="desde"
                  id="date_desde"
                  class=" border-bottom border-top-0 border-start-0 border-end-0"
                />
              </label>
              <label for="date_hasta" class="ms-3"
                >Fecha de Hasta:
                <input
                  type="number"
                  name="hasta"
                  id="date_hasta"
                  class="border-bottom border-top-0 border-start-0 border-end-0"
                />
              </label></div>`;
  }
  const numeroTarjeta = document.querySelector("#numero_tarjeta");
  const numbers = document.querySelector("#numbers");
  const nombreApellido = document.querySelector("#nombre_apellido");
  const nameTarget = document.querySelector("#name_target");
  const documento = document.querySelector("#dni_target");
  const dni = document.querySelector("#dni");
  const desde = document.querySelector("#desde");
  const hasta = document.querySelector("#hasta");
  const dateDesde = document.querySelector("#date_desde");
  const dateHasta = document.querySelector("#date_hasta");

  numbers.addEventListener("keyup", () => {
    numeroTarjeta.innerText = numbers.value;
  });
  name_target.addEventListener("keyup", () => {
    nombreApellido.innerText = nameTarget.value;
  });
  documento.addEventListener("keyup", () => {
    dni.innerText = documento.value;
  });
  dateDesde.addEventListener("keyup", () => {
    desde.innerText = dateDesde.value;
  });
  dateHasta.addEventListener("keyup", () => {
    hasta.innerText = dateHasta.value;
  });
}

function efectivo(e) {
  if (e.target.matches("#efectivo")) {
    credito.innerHTML = "";
  }
}
