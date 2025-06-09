import express from "express";
import swaggerUI, { serve } from "swagger-ui-express";

import { serverConfig } from "./common/config";
import { Database } from "./lib/mongodb";
import { appRouter } from "./api/app";
import swagger from './swagger.json'
const { PORT, DB_URL, DB_NAME } = serverConfig

const server = express();

server.use(express.json());

server.use('/api-docs', serve, swaggerUI.setup(swagger));
server.use('/api', appRouter(express.Router()))

server.listen(PORT, async () => {
    await Database.init(DB_URL, DB_NAME);
    console.log(`server is running at http://localhost:${PORT}`);
})

const gracefulShutdown = async () => {
    console.log('server is shutting down gracefully...')
    await Database.close()
    process.exit(0)
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);