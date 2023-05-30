
import { UserModel } from "../model/User.js"
import { encript, verified } from "../util/bcript.handle.js";
import { generateToken } from "../util/jwt.handle.js";
/**
 * It is used to authenticate user information
 * @author Stive Ospina
 * @param {Object} user with information of user to register
 * @param {String} user.fullname name of user
 * @param {String} user.email email of user
 * @param {String} user.password password of user
 * @param {String} [user.role = 'user'] role of user
 */
const registerNewuser = async (user) => {
    const checkIs = await UserModel.findOne({ email: user.email });
    if (checkIs) return "ALREADY_USER";
    user.password = await encript(user.password);
    const registerNewUser = await UserModel.create(user);
    return registerNewUser;
}

/**
 * It is used to authenticate user information
 * @author Stive Ospina
 * @param {String} Email of user 
 * @param {String} Password of user 
 * @returns data of user 
 */
const loginUser = async ({ email, password }) => {
    const checkIs = await UserModel.findOne({ email: email });
    if (!checkIs) return "NOT_FOUND_USER";
    const passwordHash = checkIs.password;
    checkIs.password = "";
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return "PASSWORD_INCORRECT";
    const token = generateToken(checkIs._id);
    const data = {
        "token": token,
        "user": checkIs
    }
    return data;
}
export { loginUser, registerNewuser }