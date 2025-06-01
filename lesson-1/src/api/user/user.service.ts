import { singleton } from "tsyringe"
import { User, UserModel } from "./user.model"
import { Collection, ObjectId } from "mongodb"
import { Database } from "@/lib/mongodb"

@singleton()
export class UserService {
    protected readonly collection: Collection = Database.conn.collection('users')

    async create(data: UserModel) {
        const { insertedId, acknowledged } = await this.collection.insertOne(data)
        if (acknowledged) return this.getOneById(insertedId.toString())
        return null
    }

    async getOneById(_id: string): Promise<User | null> {
        const user = await this.collection.findOne({ _id: new ObjectId(_id) })
        return user as User
    }

    async getOneByEmail(email: string): Promise<User | null> {
        const user = await this.collection.findOne({ email })
        return user as User
    }
}