import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http=inject(HttpClient);
  private api=`${enviroment.apiURL}/product`


  private obtenerHeaders():HttpHeaders{
    const token = sessionStorage.getItem("token");
    
    
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }


  crearProducto(data: FormData) {
    return this.http.post(
    `${this.api}/crearproducto`,
    data,
    {
      headers: this.obtenerHeaders()
    }
  );
  }

  traerProductos() {
    return this.http.get(
    `${this.api}/traerproducto`,
    {
      headers: this.obtenerHeaders()
    }
  );
  }

  actualizarProducto(id: string, data: any) {
    return this.http.put(
    `${this.api}/${id}`,
    data,
    {
      headers: this.obtenerHeaders()
    }
  );
  }

  eliminarProducto(id: string) {
    return this.http.delete(
    `${this.api}/${id}`,
    {
      headers: this.obtenerHeaders()
    }
  );
  }

traerProductoPorId(id: string) {
  return this.http.get(
    `${this.api}/${id}`,
    {
      headers: this.obtenerHeaders()
    }
  );
}


}