const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "Img/carrusel");

const imagenes = fs.readdirSync(carpeta)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(file => `img/${file}`);

fs.writeFileSync(
    "imagenes.json",
    JSON.stringify(imagenes, null, 2)
);

console.log("✔ imagenes.json actualizado");