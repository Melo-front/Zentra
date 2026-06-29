import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';



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
          alert("Inicaste Sesion")
          console.log(respuesta)
          this.cargando = false;

          
          localStorage.setItem("token", respuesta.token);

          
          this.router.navigate(['/task']);
        },
        error: (error) => {
          this.cargando = false;
          this.error = "Error al iniciar sesión";
          console.log(error);
        }
      });
    }
};


