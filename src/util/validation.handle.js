import { validationResult } from "express-validator";

/**
 * It is validate the information entered
 */
const validationExpress = (request, response, next) => {
    try {
        validationResult(request).throw();
        return next();
    } catch (err) {
        response.status(400);
        response.send({ errors: err.array() });
    }
}
export { validationExpress }