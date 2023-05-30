import "dotenv/config"
import express, { json } from "express"


import db from "./src/config/mongo.js";
import routesAuth from './src/routes/auth.js';
import routePqrs from './src/routes/pqrs.js'
import { swaggerDocs } from './src/routes/swagger.js'
import { logger } from "./src/util/logger.handle.js";
import cors from "cors"
import { handleHttp } from "./src/util/error.handle.js";


const app = express();
const PORT = process.env.PORT || 3002;
app.use(json());
app.use(cors({
    origin: '*'
}))
app.use(routePqrs);
app.use(routesAuth);

db().then((e) => {
    logger.info("Conexión a Base de datos exitosa")
    console.log("Conexión a Base de datos exitosa");
}).catch((error) => {
        logger.error("Error conexión con base de datos")
        console.log({"error":"Error conexión con base de datos", "msg":error});
    });

app.listen(PORT, () => {
    swaggerDocs(app, PORT)
    logger.info(`Listen in port ${PORT}`);
});
