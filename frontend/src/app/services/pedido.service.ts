import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private api = `${enviroment.apiURL}/pedido`;

  crearPedido(data: any) {

    return this.http.post(
      this.api,
      data,
      {
        headers: this.authService.obtenerHeaders()
      }
    );

  }


  obtenerPedidos() {

  return this.http.get(
    this.api,
    {
      headers: this.authService.obtenerHeaders()
    }
  );

}

obtenerTodosPedidos() {

  return this.http.get(
    `${this.api}/admin`,
    {
      headers: this.authService.obtenerHeaders()
    }
  );

}

actualizarEstado(id: string, estado: string) {

  return this.http.put(
    `${this.api}/${id}`,
    { estado },
    {
      headers: this.authService.obtenerHeaders()
    }
  );

}
}
