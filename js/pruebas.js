function mostrarProductos(array) {
  let productos = "";
  array.forEach((element) => {
    productos += `${element.id}. ${element.tittle} \n`;
  });
  productos += "0. Salir";
  return productos;
}

function Producto(id, tittle, precio, stock) {
  this.id = id;
  this.tittle = tittle;
  this.precio = parseFloat(precio);
  this.stock = stock;

  //vender
  this.vendido = function (cantidad) {
    if (cantidad <= this.stock) {
      return (this.stock -= cantidad);
    }
  };
}

const productosGenerales = [
  new Producto(1, "i7", 60000, 5),
  new Producto(2, "i9", 80000, 20),
  new Producto(3, "R7", 55000, 15),
  new Producto(4, "R9", 75000, 30),
  new Producto(5, "3080", 300000, 10),
  new Producto(6, "3090", 600000, 20),
  new Producto(7, "6800", 260000, 5),
  new Producto(8, "6900", 320000, 15),
  new Producto(9, "Z690", 100000, 10),
  new Producto(10, "X570S", 65000, 20),
  new Producto(11, "Z690PLUS", 50000, 10),
  new Producto(12, "B550", 35000, 20),
];

let comprarProducto = parseFloat(prompt(mostrarProductos(productosGenerales)));

const carrito = [];
let totalCompra = 0;
let totalCantidad = 0;

while (comprarProducto != 0) {
  let productoEncontrado = encontrarProducto(comprarProducto);

  let cantidadProducto = parseFloat(
    prompt(
      "Ingresa la cantidad de unidades del producto seleccionado que quieres agregar a tu compra"
    )
  );
  if (isNaN(cantidadProducto)) {
    alert(
      "Usted no ingresó una cantidad válida. \nPor favor intente nuevamente."
    );
  } else {
    switch (comprarProducto) {
      case "1":
        if (producto1.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto1.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto1.stock +
              " unidad/es de este producto."
          );
        } else {
          producto1.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto1);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Microprocesador/es Intel i7 \nDeberá abonar un total de $ " +
              producto1.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Microprocesador/es " +
              producto1.tittle +
              " por un valor total de $ " +
              producto1.precio * cantidadProducto
          );
          totalCompra += producto1.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;

      case "2":
        if (producto2.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto2.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto2.stock +
              " unidad/es de este producto."
          );
        } else {
          producto2.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto2);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Microprocesador/es Intel i9 \nDeberá abonar un total de $ " +
              producto2.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Microprocesador/es " +
              producto2.tittle +
              " por un valor total de $ " +
              producto2.precio * cantidadProducto
          );
          totalCompra += producto2.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "3":
        if (producto3.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto3.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto3.stock +
              " unidad/es de este producto."
          );
        } else {
          producto3.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto3);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Microprocesador/es AMD Ryzen 7 \nDeberá abonar un total de $ " +
              producto3.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Microprocesador/es " +
              producto3.tittle +
              " por un valor total de $ " +
              producto3.precio * cantidadProducto
          );
          totalCompra += producto3.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "4":
        if (producto4.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto4.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto4.stock +
              " unidad/es de este producto."
          );
        } else {
          producto4.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto4);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Microprocesador/es AMD Ryzen 9 \nDeberá abonar un total de $ " +
              producto4.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Microprocesador/es " +
              producto4.tittle +
              " por un valor total de $ " +
              producto4.precio * cantidadProducto
          );
          totalCompra += producto4.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "5":
        if (producto5.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto5.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto5.stock +
              " unidad/es de este producto."
          );
        } else {
          producto5.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto5);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Placa/s de Video RTX3080 \nDeberá abonar un total de $ " +
              producto5.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Placa/s de Video " +
              producto5.tittle +
              " por un valor total de $ " +
              producto5.precio * cantidadProducto
          );
          totalCompra += producto5.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "6":
        if (producto6.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto6.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto6.stock +
              " unidad/es de este producto."
          );
        } else {
          producto6.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto6);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Placa/s de Video RTX3090 \nDeberá abonar un total de $ " +
              producto6.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Placa/s de Video " +
              producto6.tittle +
              " por un valor total de $ " +
              producto6.precio * cantidadProducto
          );
          totalCompra += producto6.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "7":
        if (producto7.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto7.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto7.stock +
              " unidad/es de este producto."
          );
        } else {
          producto7.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto7);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Placa/s de Video RX6800 \nDeberá abonar un total de $ " +
              producto7.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Placa/s de Video " +
              producto7.tittle +
              " por un valor total de $ " +
              producto7.precio * cantidadProducto
          );
          totalCompra += producto7.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "8":
        if (producto8.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto8.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto8.stock +
              " unidad/es de este producto."
          );
        } else {
          producto8.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto8);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Placa/s de Video RX6900 \nDeberá abonar un total de $ " +
              producto8.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Placa/s de Video " +
              producto8.tittle +
              " por un valor total de $ " +
              producto8.precio * cantidadProducto
          );
          totalCompra += producto8.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "9":
        if (producto9.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto9.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto9.stock +
              " unidad/es de este producto."
          );
        } else {
          producto9.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto9);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Motherboard/s ASUS ROG MAXIMUS Z690 \nDeberá abonar un total de $ " +
              producto9.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Motherboard/s " +
              producto9.tittle +
              " por un valor total de $ " +
              producto9.precio * cantidadProducto
          );
          totalCompra += producto9.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "10":
        if (producto10.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto10.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto10.stock +
              " unidad/es de este producto."
          );
        } else {
          producto10.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto10);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Motherboard/s AORUS X570S ELITE \nDeberá abonar un total de $ " +
              producto10.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Motherboard/s " +
              producto10.tittle +
              " por un valor total de $ " +
              producto10.precio * cantidadProducto
          );
          totalCompra += producto10.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "11":
        if (producto11.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto11.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto11.stock +
              " unidad/es de este producto."
          );
        } else {
          producto11.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto11);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Motherboard/s ASUS Z690PLUS TUF GAMING \nDeberá abonar un total de $ " +
              producto11.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Motherboard/s " +
              producto11.tittle +
              " por un valor total de $ " +
              producto11.precio * cantidadProducto
          );
          totalCompra += producto11.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      case "12":
        if (producto12.stock == 0) {
          alert("Actualmente no tenemos disponibilidad de este producto.");
        } else if (cantidadProducto > producto12.stock) {
          alert(
            "No hay suficiente stock. Actualmente disponemos de " +
              producto12.stock +
              " unidad/es de este producto."
          );
        } else {
          producto12.vendido(cantidadProducto);
          carrito.push(cantidadProducto, producto12);
          alert(
            "Usted seleccionó " +
              cantidadProducto +
              " Motherboard/s GIGABYTE B550 AORUS PRO \nDeberá abonar un total de $ " +
              producto12.precio * cantidadProducto
          );
          console.log(
            "Se vendió un total de " +
              cantidadProducto +
              " Motherboard/s " +
              producto12.tittle +
              " por un valor total de $ " +
              producto12.precio * cantidadProducto
          );
          totalCompra += producto12.precio * cantidadProducto;
          totalCantidad += parseFloat(cantidadProducto);
        }
        break;
      default:
        alert(
          "Usted no ingresó un producto válido.\nPor favor intente nuevamente"
        );
        break;
    }
    comprarProducto = prompt(mostrarProductos(productosGenerales));
  }
}
for (const {} of carrito) {
  console.log(
    "En el carrito hay un total de " +
      totalCantidad +
      " productos y suman un total de $ " +
      totalCompra
  );
}
carrito.forEach((productosCarrito) => {
  console.log(productosCarrito);
});

console.log(carrito);

console.log("La compra realizada suma un total de $ " + totalCompra);
console.log(listaProductos);

/*let totalCarrito = carrito.reduce((acc, iterador) => acc + (iterador.precio * iterador.cantidadProducto), 0);
console.log(`El importe total a pagar es de $ ${totalCarrito}`);
DEBERÍA FUNCIONAR PERO DEVUELVE NaN...
*/

function encontrarProducto(dato) {
  let product = productosGenerales.find((el) => el.id === dato);
  return product;
}
