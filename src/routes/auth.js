import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controller/auth.js";
import { validateCreate, validateLogin } from "../validators/user.js";

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 6473b0445cf9c3849ds34735
 *              fullname:
 *                  type: string
 *                  example: John Graiel Brown
 *              email:
 *                  type: string
 *                  example: "user@servicehost.com"
 *              role:
 *                   type: string
 *                   example: user
 *
 * 
*/


/**
 * @openapi
 * /login:
 *   post:
 *     summary: login
 *     description: this endpoint permited connect of user with data api
 *     tags:
 *      - User
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          content:
 *              application/json:
 *                  schema:
 *                       type: object
 *                  example: 
 *                      { "email":"user@correo.com" , "password":"****************"}
 *                  
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: oji0332k2k32ñk22j32jiw2e2i3j2jioj2ioji2
 *                 data:
 *                   type: array 
 *                   items: 
 *                      $ref: "#/components/schemas/User"
 */
router.post("/login", validateLogin, loginCtrl);


/**
 * @openapi
 * /register:
 *   post:
 *     summary: register a new user 
 *     tags:
 *      - User
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          content:
 *              application/json:
 *                  schema:
 *                       type: object
 *                  example: { "fullname":"" , "email":"", "password":""}
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/User"
 *          
 */
router.post("/register", validateCreate, registerCtrl);

export default router 