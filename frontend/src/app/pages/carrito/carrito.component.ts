import { Component, inject, OnInit} from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  private carritoService = inject(CarritoService);
  private pedidoService = inject(PedidoService);

  carrito: any[] = [];
  total = 0;

  ngOnInit(): void {

  this.carrito = this.carritoService.obtenerCarrito();

  this.total = this.carritoService.obtenerTotal();

}


aumentar(id: string) {

  this.carritoService.aumentarCantidad(id);

  this.total = this.carritoService.obtenerTotal();

}

disminuir(id: string) {

  this.carritoService.disminuirCantidad(id);

  this.total = this.carritoService.obtenerTotal();

}

finalizarCompra(): void {

  const pedido = {

    productos: this.carrito.map(producto => ({

      producto: producto._id,
      nombre: producto.producto,
      precio: producto.precio,
      cantidad: producto.cantidad,
      subtotal: producto.precio * producto.cantidad

    })),

    total: this.total

  };

  this.pedidoService.crearPedido(pedido).subscribe({

    next: (respuesta: any) => {

      Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        text: 'Tu pedido fue registrado correctamente.',
        confirmButtonText: 'Aceptar'
      }).then(() => {

        this.carritoService.vaciarCarrito();

        this.carrito = [];

        this.total = 0;

      });

    },

    error: (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error?.msg || 'No fue posible registrar el pedido.'
      });

    }

  });

}

}
