import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = JSON.parse(
  localStorage.getItem('carrito') || '[]'
);

  constructor() { }

private guardarCarrito(): void {

  localStorage.setItem(
    "carrito",
    JSON.stringify(this.carrito)
  );

}

  agregarProducto(producto: any) {

  const existe = this.carrito.find(
    p => p._id === producto._id
  );

  if (existe) {

    existe.cantidad++;

  } else {

    this.carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  this.guardarCarrito();

}

aumentarCantidad(id: string) {

  const producto = this.carrito.find(
    p => p._id === id
  );

  if (producto) {

    producto.cantidad++;

    this.guardarCarrito();

  }

}


disminuirCantidad(id: string) {

  const producto = this.carrito.find(
    p => p._id === id
  );

  if (!producto) return;

  if (producto.cantidad > 1) {

    producto.cantidad--;

  } else {

    this.eliminarProducto(id);

  }

  this.guardarCarrito();

}

obtenerTotal(): number {

  return this.carrito.reduce(
    (total, producto) =>
      total + (producto.precio * producto.cantidad),
    0
  );

}


  obtenerCarrito() {
    return this.carrito;
  }

  eliminarProducto(id: string) {

  this.carrito = this.carrito.filter(
    producto => producto._id !== id
  );

  this.guardarCarrito();

}

  vaciarCarrito() {

  this.carrito = [];

  this.guardarCarrito();

}

}