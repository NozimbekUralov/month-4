import express, { Router } from "express";
import swaggerUI from "swagger-ui-express";
import { serverConfig } from "./common/config";
import { RegisterRoutes } from "./routes/routes";
import { DB } from "./lib/mongodb";
import swagger from '../swagger.json'

function mainRouter(router: Router): Router {
    RegisterRoutes(router)
    return router
}

export async function startApp() {
    const app = express();
    const { PORT } = serverConfig

    app.use(express.json())
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger))
    app.use("/api", mainRouter(Router()))

    app.listen(PORT, async () => {
        try {
            await DB.connect()
            console.log(`api docs at http://localhost:${PORT}/api-docs`)
            console.log(`server is running at http://localhost:${PORT}`)
        } catch (err) {

        }
    })
}