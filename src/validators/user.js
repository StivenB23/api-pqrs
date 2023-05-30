import { check } from "express-validator";
import { validationExpress } from "../util/validation.handle.js";
import { UserModel } from "../model/User.js";

const validateCreate = [
    check('fullname')
        .exists().withMessage('El campo fullname no existe')
        .not()
        .isEmpty().withMessage('El campo fullname no puede estar vacio'),
    check('email')
        .exists().withMessage('El campo email no existe')
        .not()
        .isEmpty().withMessage('El campo email no puede estar vacio')
        .isEmail().withMessage('El email ingresado no es valido')
        .custom(async value => {
            const existEmail = await UserModel.find({ email: value });
            if (existEmail.length != 0) {
                throw new Error("El email ya ha sido registrado");
            }
        }),
    check('password')
        .exists().withMessage('El campo password no existe')
        .not()
        .isEmpty().withMessage('El campo password no puede estar vacio'),
    (request, response, next) => {
        validationExpress(request, response, next)
    }
]

const validateLogin = [
    check('email')
        .exists().withMessage('El campo email no existe')
        .not()
        .isEmpty().withMessage('El campo email no puede estar vacio')
        .isEmail().withMessage('El email ingresado no es valido'),
    check('password')
        .exists().withMessage('El campo password no existe')
        .not()
        .isEmpty().withMessage('El campo password no puede estar vacio'),
    (request, response, next) => {
        validationExpress(request, response, next)
    }
]

export { validateCreate, validateLogin }