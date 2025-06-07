import express, { Router } from "express";
import { serverConfig } from "./common/config";
import { RegisterRoutes } from "./routes/routes";
// import { DB } from "./lib/mongodb";

function mainRouter(router: Router): Router {
    RegisterRoutes(router)
    return router
}

export async function startApp() {
    const app = express();
    const { PORT } = serverConfig

    app.use("/api", mainRouter(Router()))

    app.listen(PORT, async () => {
        try {
            // await DB.connect()
            console.log(`server is running at http://localhost:${PORT}`)
        } catch (err) {

        }
    })
}