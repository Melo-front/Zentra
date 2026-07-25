import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-pedidos',
  imports: [CommonModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent implements OnInit {

  private pedidoService = inject(PedidoService);

  pedidos: any[] = [];

  ngOnInit(): void {

    this.pedidoService.obtenerTodosPedidos().subscribe({

      next: (resp: any) => {

        this.pedidos = resp;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }


  cambiarEstado(id: string, event: Event): void {

  const estado = (event.target as HTMLSelectElement).value;

  this.pedidoService.actualizarEstado(id, estado).subscribe({

    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        timer: 1200,
        showConfirmButton: false
      });

    },

    error: (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error?.msg || 'No fue posible actualizar el estado.'
      });

    }

  });

}

obtenerClaseSelect(estado: string): string {

  switch (estado) {

    case 'Pendiente':
      return 'bg-warning text-dark border-warning';

    case 'Enviado':
      return 'bg-primary text-white border-primary';

    case 'Entregado':
      return 'bg-success text-white border-success';

    case 'Cancelado':
      return 'bg-danger text-white border-danger';

    default:
      return '';

  }

}

}