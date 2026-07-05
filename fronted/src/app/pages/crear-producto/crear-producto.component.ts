import { Component , inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {


  imagen!: File;

  private fb=inject(FormBuilder);
  private productService= inject(ProductService);
  private router=inject(Router);

  cargando: boolean=false;
  error: string = "";
  

   form = this.fb.group({
  producto: ['', [Validators.required, Validators.minLength(3)]],
  marca: ['', [Validators.required, Validators.minLength(1)]],
  descripcion: ['', [Validators.required, Validators.minLength(5)]],
  categoria: ['', Validators.required],
  precio: ['', Validators.required],
  cantidad: ['', Validators.required]
});

  


  seleccionarImagen(event: any) {

  if (event.target.files.length > 0) {
    this.imagen = event.target.files[0];
  }

  }


    crearProducto(){
    
        if(this.form.invalid){
          this.form.markAllAsTouched();
          return;
        }
    
        this.cargando=true;
    
        const formData = new FormData();

        formData.append("producto", this.form.value.producto!);
        formData.append("marca", this.form.value.marca!);
        formData.append("descripcion", this.form.value.descripcion!);
        formData.append("categoria", this.form.value.categoria!);
        formData.append("precio", this.form.value.precio!.toString());
        formData.append("cantidad", this.form.value.cantidad!.toString());
        formData.append("image", this.imagen);


        this.productService
            .crearProducto(formData)
            .subscribe({
              next:()=>{
                this.cargando=false;
                 Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'El producto ha sido creada correctamente.',
                    confirmButtonColor: '#c8a46b'
                  }).then(() => {
                    this.router.navigate(['/productos']);
                  });
              },
              error:(error)=>{
                this.cargando=false;
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.error?.msg || 'No fue posible crear el producto.',
                  confirmButtonColor: '#c8a46b'
                });
              }
            })
      }

}
