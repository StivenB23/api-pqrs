import { matchedData } from "express-validator";
import { findAllPqrs, findByIdPqrs, findByUserPqrs, registerPqrs, updatePqrs } from "../services/pqrs.js"
import { logger } from "../util/logger.handle.js";
import { handleHttp } from "../util/error.handle.js";

/**
 * List all pqrs
 */
const getAllPqrs = async (request, response) => {
    const filters = request.query;
    try {
        const responsePqrs = await findAllPqrs(filters);
        logger.info("Petición listar todas las pqrs");
        response.status(200)
        response.json(responsePqrs);
    } catch (error) {
        logger.error("Error al listar usuarios");
        handleHttp(response, 404, "Not found");
    }
}

/**
 * List all pqrs by Id
 */
const getByIdPqrs = async (request, response) => {
    const { id } = request.params;
    try {
        const responsePqrs = await findByIdPqrs(id);
        if (responsePqrs.length == 0) {
            handleHttp(response, 404, "Not found pqrs");
        } else {
            logger.info(`Busqueda pqrs por id ${id} exitosa`);
            response.status(200).send(responsePqrs)
        }
    } catch (error) {
        logger.error(`Busqueda pqrs por id ${id} sin resultados`);
        handleHttp(response, 404, "Not found pqrs find id invalid");
    }
}

/**
 * List all pqrs by Id of user
 */
const getByUserPqrs = async (request, response) => {
    const { userid } = request.params;
    try {
        const responsePqrs = await findByUserPqrs(userid);
        if (responsePqrs.length == 0) {
            logger.info(`Busqueda pqrs por userid ${userid} sin resultados`);
            handleHttp(response, 404, "Not found pqrs");
        } else {
            logger.info(`Busqueda pqrs por userid ${userid} exitosa`);
            response.status(200).send(responsePqrs)
        }
    } catch (error) {
        logger.error(`Busqueda pqrs por userid ${userid} sin resultados`);
        handleHttp(response, 404, "Not found pqrs for userid invalid");
    }
}

/**
 * create a new pqrs
 */
const createPqrs = async (request, response) => {
    const body = matchedData(request);
    try {
        const responsePqrs = await registerPqrs(body);
        logger.info(`Pqrs registrada de forma exitosa`);
        response.status(200);
        response.send(responsePqrs);
    } catch (error) {
        logger.error(`Pqrs no registrada exitosamente`);
        handleHttp(response, 500, "Error al registrar la pqrs");
    }
}

/**
 * update information of pqrs
 */
const updatepqrs = async (request, response) => {
    const { id } = request.params;
    try {
        const respondePqrs = await updatePqrs(id, request.body);
        logger.info(`Pqrs actualizada de forma exitosa`);
        response.send(respondePqrs);
    } catch (error) {
        logger.error(`Pqrs con id ${id} no actualizada de forma exitosa`);
        handleHttp(response, 404, "El id ingresado no es valido para realizar la actualización");
    }
}

export { createPqrs, getAllPqrs, getByIdPqrs, getByUserPqrs, updatepqrs }