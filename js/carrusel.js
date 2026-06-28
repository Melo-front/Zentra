const imagen = document.getElementById("imagen");

const imagenes = [
    "Img/carrusel/Hombre 1.jpeg",
    "Img/carrusel/Medias 1.jpeg",
    "Img/carrusel/Medias 2.jpeg",
    "Img/carrusel/Mujer 1.jpeg",
    "Img/carrusel/Mujer 2.jpeg",
    "Img/carrusel/Mujer 3.jpeg",
    "Img/carrusel/Mujer 4.jpeg",
    "Img/carrusel/Mujer 5.jpeg",
    "Img/carrusel/Mujer 6.jpeg",

];

let indice = 0;

document.getElementById("siguiente").addEventListener("click", () => {
    indice++;

    if(indice >= imagenes.length){
        indice = 0;
    }

    imagen.src = imagenes[indice];
});

document.getElementById("anterior").addEventListener("click", () => {
    indice--;

    if(indice < 0){
        indice = imagenes.length - 1;
    }

    imagen.src = imagenes[indice];
});