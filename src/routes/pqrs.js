import { Router } from "express";
import { createPqrs, getAllPqrs, getByIdPqrs, getByUserPqrs, updatepqrs } from "../controller/pqrs.js";
import { checkRoleAuth } from "../middleware/authRole.js";
import { validateCreate } from "../validators/pqrs.js";
import { Authetication } from "../middleware/session.js";

const router = Router();
/**
 * @openapi
 * components:
 *       securitySchemes:
 *          BearerAuth:
 *              type: http
 *              scheme: bearer
 * 
 * */ 

/**
 * @openapi
 * components:
 *  schemas:
 *      Pqrs:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 6473b0445cf9c3849ds34735
 *              user:
 *                  type: string
 *                  example: 6473b04s6cf9c3849db34735
 *              type:
 *                  type: string
 *                  example: Queja
 *              description:
 *                     type: string
 *                     example: El servicio brindado no fue de calidad
 *              date:
 *                   type: Date
 *                   example: 2023-05-29 10:00:00
 *              areas:
 *                  type: Array
 *                  example: ["Servicio al cliente"] 
 *              state: 
 *                  type: string
 *                  example: pendiente
 *              civilservant:
 *                  type: string
 *                  example: ["John Doe", "Wendie Brown"]
 *
 * 
*/

/**
 * @openapi
 * /pqrs:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: return all pqrs
 *     tags:
 *      - pqrs
 *     
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: petición
 *       - in: query
 *         name: areas
 *         schema:
 *           type: string
 *           example: RRHH
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2023-05-29  
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
 */
router.get("/pqrs", Authetication, checkRoleAuth(['admin']), getAllPqrs);
// router.get("/pqrs", getAllPqrs);
/**
 * @openapi
 * /pqrs/{id}:
 *   get:
 *     summary: return a pqrs
 *     tags:
 *      - pqrs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
  *       4XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "El id ingresado no es valido para realizar la busqueda"
 */
router.get("/pqrs/:id", getByIdPqrs);
// router.get("/pqrs/:id", Authetication, getByIdPqrs);
/**
 * @openapi
 * /pqrs/user/{userid}:
 *   get:
 *     summary: return all pqrs of a user
 *     tags:
 *      - pqrs
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
  *       4XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "El id ingresado no es valido para realizar la busqueda"
 */
router.get("/pqrs/user/:userid", getByUserPqrs);
/**
 * @openapi
 * /pqrs/:
 *   post:
 *     summary: create a new pqrs
 *     tags:
 *      - pqrs
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          required: true
 *          content:
 *              application/json:
 *               Schema: 
 *                  $ref: "#/components/schemas/Pqrs"
 *  
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
 */
router.post("/pqrs", validateCreate, createPqrs);
/**
 * @openapi
 * /pqrs/:
 *   put:
 *     summary: update the state of a pqrs
 *     tags:
 *      - pqrs
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          required: true
 *          content:
 *              application/json:
 *               Schema: 
 *                  $ref: "#/components/schemas/Pqrs"
 *              application/x-www-form-urlencoded:
 *               schema:
 *                  $ref: '#/components/schemas/Pqrs'
 *                  
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
  *       4XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "El id ingresado no es valido para realizar la busqueda"
 */
router.put("/pqrs/:id", updatepqrs);
export default router