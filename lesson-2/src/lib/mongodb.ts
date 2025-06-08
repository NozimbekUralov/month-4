import { serverConfig } from "@/common/config";
import mongoose from "mongoose";

export class DB {
    static async connect() {
        try {
            await mongoose.connect(serverConfig.DB_URL)
            console.log("Database connected")
        } catch (err) {
            console.log("Database error: ", err)
            process.exit(1)
        }
    }
}