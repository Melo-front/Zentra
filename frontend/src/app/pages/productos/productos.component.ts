import { Component,inject, OnInit ,DoCheck } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-productos',
  imports: [
      CommonModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit,DoCheck {

  private productService = inject(ProductService);
  private router = inject(Router);
  private authService=inject(AuthService);
  private carritoService = inject(CarritoService)


  productos: any[] = [];

  cargando = false;

  esAdmin = false;
  autenticado:boolean=false;
  ngDoCheck(): void {
    this.autenticado=this.authService.estaAutenticado()
  }

  ngOnInit(): void {
    this.esAdmin = sessionStorage.getItem("rol") === "admin";

    this.obtenerProductos();
  }

  obtenerProductos() {

    this.cargando = true;

    this.productService.traerProductos().subscribe({

      next: (resp: any) => {
        this.productos = resp;
        this.cargando = false;
      },

      error: (error) => {
        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.msg || 'No fue posible obtener los productos.'
        });
      }

    });

  }

  eliminarProducto(id: string) {

    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (result.isConfirmed) {

        this.productService.eliminarProducto(id).subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              timer: 1500,
              showConfirmButton: false
            });

            this.obtenerProductos();

          },

          error: (error) => {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.msg || 'No fue posible eliminar el producto.'
            });

          }

        });

      }

    });

  }

  editarProducto(id: string) {

    this.router.navigate(['/editar-producto', id]);

  }

    agregarAlCarrito(producto: any): void {


  this.carritoService.agregarProducto(producto);

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: 'El producto se agregó al carrito.',
    timer: 1500,
    showConfirmButton: false
  });

}

}
