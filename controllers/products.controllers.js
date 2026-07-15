const { response } = require("express");

const Product=require("../models/Product")


const crearproducto= async(req,res)=>{
    try{
         const productoExiste = await Product.findOne({
            producto:  req.body.producto,
        });

        if (productoExiste) {
            return res.status(400).json({
                msg: `Ya existe el producto ${req.body.producto} .`
            });
        }


        if (!req.file) {
            return res.status(400).json({
                msg: "Debe subir una imagen."
            });
        }

        const nuevoproduct = new Product({
            producto: req.body.producto,
            descripcion: req.body.descripcion,
            marca: req.body.marca,
            categoria: req.body.categoria,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            image: `http://localhost:3000/public/images/${req.file.filename}`,
            imageName: req.file.originalname,
            usuario: req.user.id
        });

        await nuevoproduct.save();

    
        return res.status(201).json({msg:"Producto creado correctamente"});
    }catch(error){
        res.status(500).json({error:`Error al crear el producto ${error.message}`})
    }

}

const traerproducto = async (req, res) => {
    try {
        const productos = await Product.find();

        return res.status(200).json(productos);

    } catch (error) {
        return res.status(500).json({
            error: `La búsqueda del producto falló: ${error.message}`
        });
    }
};

const traerproductoid = async (req, res) => {
    try {

        const producto = await Product.findOne({
            _id: req.params.id
        });

        if (!producto) {
            return res.status(404).json({
                msg: "El producto no existe."
            });
        }

        return res.status(200).json(producto);

    } catch (error) {
        return res.status(500).json({
            error: `La búsqueda del producto falló: ${error.message}`
        });
    }
};

const actualizarproducto= async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true,
            runValidators: true
            }
            
        )

        if (!product) {
            return res.status(404).json({
                msg: "Producto no encontrado."
            });
        }
        
        res.json(product);
    }catch(error){
        res.status(500).json({error:`Erro al actualizar el producto  ${error.message}`})
    }

}

const eliminarproducto= async(req,res)=>{
    try{
        const producto = await Product.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({
                msg: "El producto no existe."
            });
        }
        res.json(`El producto ${producto.producto} ha sido eliminado.`);
    }catch(error){
        res.status(500).json({error:`Error al eliminar el producto: ${error.message}`})
    }
}

module.exports={
    crearproducto,
    traerproducto,
    eliminarproducto,
    actualizarproducto,
    traerproductoid
}