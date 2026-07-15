import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http=inject(HttpClient);
  private api = enviroment.apiURL;

  registrar(usuario: User) : Observable<any>{
    return this.http.post(
    `${this.api}/auth/registrar`,
    usuario
    )
  }

  login(usuario: User) : Observable<any>{
    return this.http.post(
    `${this.api}/auth/login`,
    usuario
    )
  }

  guardartoken(token: string): void{
    sessionStorage.setItem("token", token)
  }
  obtenertoken():string|null{
    return sessionStorage.getItem("token")
  }

  obtenerHeaders(): HttpHeaders {

  const token = this.obtenertoken();

  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

}

  estaAutenticado():boolean{
    return !!this.obtenertoken();
  }

  logout():void{
    sessionStorage.removeItem("token")
  }
}


