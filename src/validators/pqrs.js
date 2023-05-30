import { check } from "express-validator";
import { validationExpress } from "../util/validation.handle.js";

const validateCreate = [
    check('usuario')
        .exists().withMessage('El campo usuario no existe')
        .not()
        .isEmpty().withMessage('El campo usuario no puede estar vacio'),
    check('type')
        .exists().withMessage('El campo type no existe')
        .not()
        .isEmpty().withMessage('El campo type no puede estar vacio'),
    check('description')
        .exists().withMessage('El campo description no existe')
        .not()
        .isEmpty().withMessage('El campo description no puede estar vacio'),
    check('areas')
        .exists().withMessage('El campo areas no existe')
        .not()
        .isEmpty().withMessage('El campo areas no puede estar vacio'),
    check('civilservant')
        .exists().withMessage('El campo civilservant no existe'),
    (request, response, next) => {
        validationExpress(request, response, next)
    }
]
export { validateCreate }