import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;
/**
 * It is generated of token firmated
 * @param {Number} id - id user
 * @returns token formated
 */
const generateToken = (id) => {
    const jwt = sign({ id }, JWT_SECRET);
    return jwt;
}

/**
 * It is heck the authenticity of the token
 * @param {String} jwt - token 
 * @returns {Boolean}
 */
const verifyToken = (jwt) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}
export { generateToken, verifyToken }