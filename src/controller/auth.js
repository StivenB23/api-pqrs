import { loginUser, registerNewuser } from "../services/auth.js"
import { handleHttp } from "../util/error.handle.js";
import { logger } from "../util/logger.handle.js";
/**
 * Register a new user
 * @param {*} request 
 * @param {*} response 
 */
const registerCtrl = async (request, response) => {
    const { body } = request;
    try {
        const registerUser = await registerNewuser(body);
        logger.info("Usuario registrado de forma exitosa");
        response.status(200);
        response.send(registerUser);
    } catch (error) {
        logger.error("El usuario no se pudo registro")
        handleHttp(response, 500, "Error Interno del sistema, no se puedo registrar usuario");
    }
}
/**
 *  Login
 * @param {*} request 
 * @param {*} response 
 */
const loginCtrl = async (request, response) => {
    const { email, password } = request.body;
    try {
        const responseLogin = await loginUser({ email, password });
        if (responseLogin === "PASSWORD_INCORRECT") {
            logger.error("Inicio de sesión, contraseña incorrecta");
            handleHttp(response, 404, "Incorrect password");
        } else if (responseLogin === "NOT_FOUND_USER") {
            logger.error("Inicio de sesión, Usuario no existe");
            handleHttp(response, 404, "Not found user");
        } else {
            logger.info("Inicio de sesión exitoso");
            response.status(200);
            response.send(responseLogin);
        }
    } catch (error) {
        handleHttp(response, 500, "Error Interno del sistema");
    }
}

export { registerCtrl, loginCtrl }