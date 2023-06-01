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
 *                  id:
 *                      type: string
 *                      example: 6473b0445cf9c3849ds34735
 *                  user:
 *                      type: string
 *                      example: 6473b04s6cf9c3849db34735
 *                  type:
 *                      type: string
 *                      example: Queja
 *                  description:
 *                     type: string
 *                     example: El servicio brindado no fue de calidad
 *                  date:
 *                      type: Date
 *                      example: 2023-05-29 10:00:00
 *                  areas:
 *                      type: Array
 *                      example: ["Servicio al cliente"] 
 *                  state: 
 *                      type: string
 *                      example: pendiente
 *                  civilservant:
 *                      type: string
 *                      example: ["John Doe", "Wendie Brown"]
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
 *     description: This endpoint allows the administrator to list all the pqrs, it requires authentication.
 *     tags:
 *      - pqrs
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
 *       4XX:
 *          description: Not found
 *          content:
 *              application:json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: Object
 *                              example: "Not found"
 */
router.get("/pqrs", Authetication, checkRoleAuth(['admin']), getAllPqrs);
// router.get("/pqrs", getAllPqrs);
 /**
 * @openapi
 * /pqrs/{id}:
 *   get:
 *      security:
 *        - BearerAuth: []
 *      summary: return a pqrs
 *      description: This endpoint allows the administrator to list the pqrs filtering by the id.
 *      tags:
 *       - pqrs
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          200:
 *             description: OK
 *             content:
 *               application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                  status:
 *                   type: string
 *                   example: OK
 *                  data:
 *                   type: array 
 *                   items: 
 *                         $ref: "#/components/schemas/Pqrs"
 *          400:
 *             description: FAILED
 *             content:
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    properties:
 *                     error:
 *                       type: string 
 *                       example: "El id ingresado no es valido para realizar la busqueda"
 *          404:
 *             description: NOT FOUND
 *             content:
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    properties:
 *                     error:
 *                       type: string 
 *                       example: "No se encontro resultados con el id ingresado"
 */
router.get("/pqrs/:id", Authetication,getByIdPqrs);
// router.get("/pqrs/:id", Authetication, getByIdPqrs);

 /**
 * @openapi
 * /pqrs/user/{userid}:
 *   get:
 *     security:
 *        - BearerAuth: []
 *     summary: return all pqrs of a user
 *     description: This endpoint allows the administrator to list the pqrs filtering by the user id.
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
 *       400:
 *             description: FAILED
 *             content:
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    properties:
 *                     error:
 *                       type: string 
 *                       example: "El user id ingresado no es valido para realizar la busqueda"
 *       404:
 *             description: NOT FOUND
 *             content:
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    properties:
 *                     error:
 *                       type: string 
 *                       example: "No se encontro resultados con el user id ingresado"
 */
router.get("/pqrs/user/:userid",Authetication, getByUserPqrs);
 /**
 * @openapi
 * /pqrs/:
 *   post:
 *     summary: create a new pqrs
 *     description: This endpoint saves new pqrs
 *     tags:
 *      - pqrs
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  type: object
 *                  example: { "type":"" , "description":"", "areas":[""],"civilservant":[""]}
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
 *       4xx:
 *             description: Bad Request
 *             content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        errors:
 *                          type: Array 
 *                          example: [{"field":"type","msg":"not exits"},{"field":"type","msg":"is empty"},{"field":"description","msg":"not exits"},{"field":"description","msg":"is empty"},{"field":"areas","msg":"not exits"},{"field":"areas","msg":"is empty"}]
 */
router.post("/pqrs", validateCreate, createPqrs);

 /**
 * @openapi
 * /pqrs/{id}:
 *   put:
 *     security:
 *        - BearerAuth: []
 *     summary: update the state of a pqrs
 *     description: This endpoint allows updating the status of the pqrs
 *     tags:
 *      - pqrs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *          description: Optional description in *Markdown*
 *          content:
 *              application/json:
 *                  schema:
 *                       type: object
 *                  example: 
 *                      {"estatus":"en proceso"}  
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
 *       400:
 *             description: Bad request
 *             content:
 *                  application/json:
 *                   schema:
 *                    type: object
 *                    properties:
 *                     error:
 *                       type: string 
 *                       example: "El user id ingresado no es valido para realizar la actualización"
 */
router.put("/pqrs/:id", Authetication,updatepqrs);
export default router