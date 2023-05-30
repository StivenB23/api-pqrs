import { UserModel } from "../model/User.js";
import { verifyToken } from "../util/jwt.handle.js";
import { logger } from "../util/logger.handle.js";

/**
 * It is responsible for allowing authorization to certain users through their roles.
 * @param {Array} roles - roles authorized to access
 */
const checkRoleAuth = (roles) => async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop();
        const tokenData = verifyToken(token);
        const userData = await UserModel.findById(tokenData.id);
        if ([].concat(roles).includes(userData.role)) {
            next();
            logger.info("Autorización exitosa");
        }else{
            response.status(409);
            logger.error("El usuario no tiene permisos para acceder a ruta")
            response.send({error:"No tienes permiso"})
        }
    } catch (error) {
        
    }
}
export {checkRoleAuth}