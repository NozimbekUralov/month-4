import { config } from 'dotenv'
config()

export const serverConfig = {
    PORT: Number(process.env.PORT) || 3000,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'test',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
}