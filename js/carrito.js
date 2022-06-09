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
const credito = document.querySelector(".contenedor");
// Tarjeta de Credito

const tarjeta = document.querySelector("#tarjeta"),
  btnAbrirFomulario = document.querySelector("#btn-abrir-formulario"),
  formulario = document.querySelector("#formulario-tarjeta"),
  numeroTarjeta = document.querySelector("#tarjeta .numero"),
  nombreTarjeta = document.querySelector("#tarjeta .nombre"),
  logoMarca = document.querySelector("#logo-marca"),
  firma = document.querySelector("#tarjeta .firma p"),
  mesExpiracion = document.querySelector("#tarjeta .mes"),
  yearExpiracion = document.querySelector("#tarjeta .year");
ccv = document.querySelector("#tarjeta .ccv");

const planes = async () => {
  const planes = await fetch("planes.json");
  const dataPlanes = await planes.json();
  consultaPlan.push(...dataPlanes);
};

const sesiones = async () => {
  const sesiones = await fetch("sesiones.json");
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
    productos.innerHTML += `<div class="col-md-12 p-4 mb-4 border rounded-3 shadow d-sm-flex justify-content-sm-evenly text-center"><div class="fw-bold">#${el.id}</div><div>${el.tipo}</div>
        <div class=""><i class="bi bi-dash-circle resta me-1"data-id="${el.id}"></i> ${el.cantidad} <i class="bi bi-plus-circle suma ms-1"data-id="${el.id}"></i></div>
        <div class="">$${el.precio}</div>
        <div><i class="bi bi-trash trash"data-id="${el.id}"></i></div</div>`;
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

// Boton finalizar compra
function comprar(e) {
  if (e.target.matches("#comprar")) {
    if (!contador) {
      Swal.fire("Error!", "No hay productos en el carrito", "error");
    } else {
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
          cantidadCarrito(contador);
          mostrarCarrito();
          Swal.fire(
            "Felicitaciones!",
            "Compra realizada con éxito.",
            "success"
          );
        }
      });
    }
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
  mostrarTarjeta(e);
  efectivo(e);
  girarTarjeta(e);
  volverFrente(e);
});
// hago aparecer la tarjeta
function mostrarTarjeta(e) {
  if (e.target.matches("#creditCard")) {
    credito.classList.toggle("active");
  }
}

function efectivo(e) {
  if (e.target.matches("#efectivo")) {
    credito.classList.remove("active");
  }
}

mostrarTotal = () => {
  totalFinal = sumarCarrito(planesElegidos);
  const total = document.querySelector("#total");
  total.textContent = `$ ${totalFinal}`;
};

mostrarTotal();

const mostrarFrente = () => {
  tarjeta.classList.contains("active") && tarjeta.classList.remove("active");
};
// giro la tarjeta al dorso
girarTarjeta = (e) =>
  e.target.matches(".delantera") && tarjeta.classList.toggle("active");
// giro la tarjeta hacia atras
volverFrente = (e) =>
  e.target.matches(".contenedor") && tarjeta.classList.remove("active");

// boton abrir formulario
btnAbrirFomulario.addEventListener("click", () => {
  btnAbrirFomulario.classList.toggle("active");
  formulario.classList.toggle("active");
});
// Seleccionar mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectMes.appendChild(opcion);
}
// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectYear.appendChild(opcion);
}
// input numeros de tarjeta
formulario.inputNumero.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;
  formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "")
    // Ponemos espacio cada cuatro numeros
    .replace(/([0-9]{4})/g, "$1 ")
    // Elimina el ultimo espaciado
    .trim();
  // reinicio la tarjeta
  numeroTarjeta.textContent = valorInput;
  if (valorInput == "") {
    numeroTarjeta.textContent = "#### #### #### ####";
    logoMarca.innerHTML = "";
  }
  // busco las imagenes de la empresa de la tarjeta
  if (valorInput) {
    logoMarca.innerHTML = "";
    const imagen = document.createElement("img");
    for (let i = 0; i < 10; i++) {
      if (valorInput[0] == i) {
        console.log(i);
        imagen.src = `../img/${i}.png`;
      }
    }
    logoMarca.appendChild(imagen);
  }

  // Volteamos la tarjeta para que el usuario vea el frente.
  mostrarFrente();
});
// * Input nombre de tarjeta
formulario.inputNombre.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;
  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, "");
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;
  if (valorInput == "") {
    nombreTarjeta.textContent = "Jhon Doe";
  }
  mostrarFrente();
});
// * Select mes
formulario.selectMes.addEventListener("change", (e) => {
  mesExpiracion.textContent = e.target.value;
  mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener("change", (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
  mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener("keyup", () => {
  !tarjeta.classList.contains("active") && tarjeta.classList.toggle("active");

  formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "");

  ccv.textContent = formulario.inputCCV.value;
});
