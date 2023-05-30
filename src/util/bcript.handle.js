import { compare, hash } from "bcrypt"
/**
 * Encript password
 * @param {String} password 
 * @returns 
 */
const encript = async (password) => {
    const passwordHash = await hash(password, 8);
    return passwordHash;
}

/**
 * verifies that the password that comes from the user and the one saved in the database are the same
 * @param {String} password - password that comes from the user
 * @param {String} passwordHash - password saved in database
 */
const verified = async (password, passwordHash) => {
    const isCorrect = await compare(password, passwordHash);
    return isCorrect;
}
export { encript, verified }