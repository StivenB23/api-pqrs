import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "PQRS api", version: "1.0.0" }
    },
    apis: ["src/routes/pqrs.js","src/routes/auth.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/docs", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    })
    console.log(`Versión 1 Docs are available at http://localhost:${port}/api/docs`);
}

export { swaggerDocs }