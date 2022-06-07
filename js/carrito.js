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
const planes = async () => {
  const planes = await fetch("./../js/planes.json");
  const dataPlanes = await planes.json();
  consultaPlan.push(...dataPlanes);
};

const sesiones = async () => {
  const sesiones = await fetch("./../js/sesiones.json");
  const dataSesiones = await sesiones.json();
  consultaPlan.push(...dataSesiones);
};

let totalFinal = 0;
let contador = 0;
let nombre;
let planesElegidos = []; // array para el carrito

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
  mostrarTotal();
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
      mostrarTotal();
      cantidadCarrito(contador);
      guardarEnStorage();
    } else {
      p.cantidad--;
      guardarEnStorage();
      mostrarTotal();
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
    mostrarTotal();
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
      mostrarTotal();
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
  tarjeta(e);
  efectivo(e);
});

function tarjeta(e) {
  if (e.target.matches("#tarjeta")) {
    credito.innerHTML = `<!-- CREDIT CARD-->
    <div class="d-flex justify-content-center mt-4">
        <form id="CreateForm" class="tarjeta_credito p-4">
            <div class="d-flex justify-content-around mb-4">
                <?xml version="1.0" encoding="UTF-8"?>
                <i class="fa-brands fa-cc-visa fa-2xl"></i>
                <i class="fa-brands fa-cc-mastercard fa-2xl"></i>
                <i class="fa-brands fa-cc-amex fa-2xl"></i>
                <i class="fa-brands fa-cc-paypal fa-2xl"></i>
            </div>
            <div class="card-number">
                <label class="mt-2">Número de Tarjeta</label>
                <input id="creditCard" placeholder="**** **** **** ****" type="text" maxlength="19" class="bg-transparent border-bottom border-0">
            </div>
            <div class="">
            <label class="mt-2">Nombre y Apellido</label>
            <input id="card-name" placeholder="** ***" type="text" class="bg-transparent border-bottom border-0">

        </div>
            <div class="d-flex justify-content-evenly me-2">
                <div class="">
                    <label class="mt-2">Fecha Vto.</label>
                    <input id="card-exp" placeholder="**/**" type="text" maxlength="5" class="bg-transparent border-bottom border-0">
  
                </div>
                <div class="">
                    <label class="mt-2">CCV</label>
                    <input id="card-ccv" placeholder="*" type="text" maxlength="3" class="bg-transparent border-bottom border-0">
  
                </div>
            </div>
        </form>
    </div>`;
  }
}

const creditCard = document.querySelector("#creditCard");
contar = 0;
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#creditCard")) {
    contar++;
    console.log(e.target.value);
    if (contar === 4) {
      e.target.value.replace(/[^a-z0-9]+/gi, "").replace(/(.{4})/g, "$1 ");
    }
  }
});

function efectivo(e) {
  if (e.target.matches("#efectivo")) {
    credito.innerHTML = "";
  }
}

mostrarTotal = () => {
  totalFinal = sumarCarrito(planesElegidos);
  const total = document.querySelector("#total");
  total.textContent = `$ ${totalFinal}`;
};

mostrarTotal();
