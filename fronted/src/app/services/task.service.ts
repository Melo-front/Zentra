import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http=inject(HttpClient);
  private api=`${enviroment.apiURL}/task`
  private obtenerHeaders():HttpHeaders{
    const token = sessionStorage.getItem("token");
    return new HttpHeaders({
      Autorization: `Bearer ${token}`
    })
  }

  constructor() { }

  obtenerTareas():Observable<Task[]>{
    return this.http.get<Task[]>(
      this.api,
      {headers:this.obtenerHeaders()}
    )
  }
}
