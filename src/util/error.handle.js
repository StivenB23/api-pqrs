/**
 * It Handles errors
 * @param {*} response - object response
 * @param {Number} code - code number of error
 * @param {String} error - message of error
 */
const handleHttp = (response, code = 403 ,error) => {
    response.status(code);
    response.send({ error });
}
export { handleHttp };