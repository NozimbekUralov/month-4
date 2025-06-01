import { RegisterRoutes } from "@/routes/routes";
import { Router } from "express";

export const appRouter = (router: Router) => {
    RegisterRoutes(router)
    return router
}