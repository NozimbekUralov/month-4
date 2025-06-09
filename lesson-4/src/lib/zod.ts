import { z } from "zod";
import { Request, Response, NextFunction } from 'express'
import { ClientError } from "@/utils";

export const Validate = (schema: z.AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync(req.body)
            if (!result.success) throw new ClientError("invalid data", 400)
            next()
        } catch (err: typeof ClientError | any) {
            res.status(err.status).json({ message: err.message })
        }
    }
}

export const name = z.string().nonempty();
export const email = z.string().email();
export const password = z.string().min(6);

export const title = z.string().nonempty();
export const description = z.string().nonempty();