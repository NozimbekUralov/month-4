import { sign, verify } from 'jsonwebtoken'
import { serverConfig } from '@/common/config'

const { JWT_SECRET, JWT_EXPIRES_IN } = serverConfig

export type user = {
    _id: string
}

export class JWT {
    static async generateToken(payload: user): Promise<string> {
        const expiresIn = Number(JWT_EXPIRES_IN.slice(0, -1)) * 60 * 1000
        return sign(payload, JWT_SECRET, { expiresIn })
    }

    static async verifyToken(token: string): Promise<user> {
        return verify(token, JWT_SECRET) as user;
    }
}