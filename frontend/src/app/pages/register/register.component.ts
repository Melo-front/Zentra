import { Component,inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink 
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  private fb=inject(FormBuilder);
  private authService= inject(AuthService);
  private router=inject(Router);

  cargando: boolean=false;
  error: string = "";
  
  form=this.fb.group({
    nombre:[
      "",
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    email:[
      "",
      [
        Validators.required,
        Validators.email
      ]
    ],
    password:[
      "",
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]
  });

  registrar(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.cargando=true;

    this.authService
        .registrar(this.form.value as any)
        .subscribe({
          next:()=>{
            this.cargando=false;
             Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido creada correctamente.',
                confirmButtonColor: '#c8a46b'
              }).then(() => {
                this.router.navigate(['/login']);
              });
          },
          error:(error)=>{
            this.cargando=false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.msg || 'No fue posible registrar el usuario.',
              confirmButtonColor: '#c8a46b'
            });
          }
        })
  }
}
