import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
      private fb = inject(FormBuilder);
      private authService = inject(AuthService);
      private router = inject(Router);

      cargando: boolean=false;
      error: string = "";

      form = this.fb.group({
        email: [
          "",
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(5)
          ]
        ]
      })

      iniciarsesion() {

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      this.cargando = true;

      this.authService.login(this.form.value as any)
      .subscribe({
        next: (respuesta) => {
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión correctamente.',
            confirmButtonText: 'Aceptar'
          });
          console.log(respuesta)
          this.cargando = false;
        
          this.authService.guardartoken(respuesta.token);
          sessionStorage.setItem("rol", respuesta.rol);


          this.router.navigate(['/productos']);

          
          
        },
        error: (error) => {
          this.cargando = false;
         
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos'
          });
                  
          
          console.log(error);
        }
      });
    }
};


