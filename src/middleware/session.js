import { handleHttp } from "../util/error.handle.js";
import { verifyToken } from "../util/jwt.handle.js";
import { logger } from "../util/logger.handle.js";

/**
 * It is responsible for authenticating that the user is logged in and has a JWT token
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const Authetication = (request, response, next) => {
    try {
        const jwtByUser = request.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isOk = verifyToken(jwt);
        if (!isOk) {
            logger.error("Sesión no tiene token");
            handleHttp(response, 401, "SESSION HAS NO TOKEN")
        }else{
            logger.info("autenticación exitosa")
            next();
        }
    } catch (error) {
        logger.error("Sesión no valida");
        handleHttp(response, 400, "SESSION NO VALIDA");
    }
}

export { Authetication }