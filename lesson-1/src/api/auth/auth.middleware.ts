import { JWT } from "@/lib/jwt";
import { Response, Request } from "express";

export function expressAuthentication(
    request: Request,
    securityName: string,
    scopes: string[],
    response: Response
): Promise<any> {
    if (securityName != 'BearerAuth' || scopes.length) {
        response.status(401).json({ message: 'unknown security method' })
    }

    const token = request.headers.authorization?.split(' ')[1]

    if (!token) {
        response.status(401).json({ message: 'No token provided' })
    }

    return JWT.verifyToken(token!)
        .then(user => {
            if (!user) {
                response?.status(401).json({ message: 'Invalid token' })
            }
            return user
        })
        .catch((error) => {
            console.log(error)
            response?.status(401).json({ message: 'Invalid token' })
        })
}
