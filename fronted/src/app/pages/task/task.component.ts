import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';


@Component({
  selector: 'app-task',
  imports: [
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
    private taskService = inject(TaskService);;
    tasks:Task[]=[];
    ngOnInit(): void {
        this.obtenerTareas();
    }

    obtenerTareas():void{
      this.taskService.obtenerTareas()
                        .subscribe({
                          next:(respuesta)=>{
                              console.log(respuesta)
                              this.tasks=respuesta;
                          },
                          error:(error)=>{
                            console.error(error)
                          }
                        })
    }
}
