import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-mis-pedidos',
  imports: [CommonModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent {

  private pedidoService = inject(PedidoService);

pedidos: any[] = [];


ngOnInit(): void {

  this.pedidoService.obtenerPedidos().subscribe({

    next: (resp: any) => {

      this.pedidos = resp;

    },

    error: (error) => {

      console.log(error);

    }

  });

}


}
