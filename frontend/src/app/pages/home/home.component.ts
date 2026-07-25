import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

imagenes = [
  'Img/carrusel/Hombre 1.jpeg',
  'Img/carrusel/Medias 1.jpeg',
  'Img/carrusel/Medias 2.jpeg',
  'Img/carrusel/Mujer 1.jpeg',
  'Img/carrusel/Mujer 2.jpeg',
  'Img/carrusel/Mujer 3.jpeg',
  'Img/carrusel/Mujer 4.jpeg',
  'Img/carrusel/Mujer 5.jpeg',
  'Img/carrusel/Mujer 6.jpeg'
];

indice = 0;

siguiente() {

  this.indice++;

  if (this.indice >= this.imagenes.length) {
    this.indice = 0;
  }

}

anterior() {

  this.indice--;

  if (this.indice < 0) {
    this.indice = this.imagenes.length - 1;
  }

}

}
