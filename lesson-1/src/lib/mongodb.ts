import { Db, MongoClient } from "mongodb";

export class Database {
    private static client: InstanceType<typeof MongoClient>;
    private static db: Db;
    static async init(dbConnectionUrl: string, dbName: string): Promise<void> {
        try {
            this.client = new MongoClient(dbConnectionUrl)
            await this.client.connect()
            this.db = this.client.db(dbName)
            console.log('Database connected');
        } catch (err) {
            console.log(err);
        }
    }

    static get conn(): Db {
        if (!this.db) throw new Error('Database not connected');
        return this.db;
    }

    static async close(): Promise<void> {
        await this.client.close(true)
    }
}