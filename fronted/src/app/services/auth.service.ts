import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


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

}


