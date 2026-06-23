const {body}= require ("express-validator")
const registervalidator=[
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({min: 3}).withMessage("Minimo 3 caracteres"),
        body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email valido"),
        body("password")
        .notEmpty().withMessage("El Password no puede ser vacia")
        .isStrongPassword().withMessage("La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas y caracteres especiales.")
]


const loginvalidator=[
        body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email valido"),
        body("password")
        .notEmpty().withMessage("El Password no puede ser vacia")
        .isStrongPassword().withMessage("La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas y caracteres especiales.")
]

module.exports={
    registervalidator, loginvalidator
}