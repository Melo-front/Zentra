import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-editar-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);


  cargando = false;
  error = "";

        form = this.fb.group({
        producto: ['', [Validators.required, Validators.minLength(3)]],
        marca: ['', [Validators.required, Validators.minLength(1)]],
        descripcion: ['', [Validators.required, Validators.minLength(5)]],
        categoria: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required]
      });



  id!: string;

  ngOnInit(): void {

  this.id = this.route.snapshot.paramMap.get('id')!;

  this.obtenerProducto();

}

obtenerProducto() {

  this.productService.traerProductoPorId(this.id)
    .subscribe({

      next: (producto: any) => {

        this.form.patchValue({
          producto: producto.producto,
          marca: producto.marca,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          precio: producto.precio,
          cantidad: producto.cantidad
        });

      },

      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.msg || 'No fue posible obtener el producto.',
          confirmButtonColor: '#c8a46b'
        });
      }

    });

}


actualizarProducto() {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.cargando = true;

  this.productService
    .actualizarProducto(this.id, this.form.value)
    .subscribe({

      next: () => {

        this.cargando = false;

        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'El producto fue actualizado correctamente.',
          confirmButtonColor: '#c8a46b'
        }).then(() => {

          this.router.navigate(['/productos']);

        });

      },

      error: (error) => {

        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.msg || 'No fue posible actualizar el producto.',
          confirmButtonColor: '#c8a46b'
        });

      }

    });

}

}
