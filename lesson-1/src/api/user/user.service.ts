import { singleton } from "tsyringe"
import { User, UserModel } from "./user.model"
import { Collection, ObjectId } from "mongodb"
import { Database } from "@/lib/mongodb"

@singleton()
export class UserService {
    protected readonly collection: Collection = Database.conn.collection('users')

    async create(data: UserModel): Promise<User | null> {
        const { insertedId, acknowledged } = await this.collection.insertOne(data)
        if (acknowledged) return this.getOneById(insertedId.toString())
        return null
    }

    async update(_id: string, data: Partial<UserModel>): Promise<User | null> {
        const { acknowledged } = await this.collection.updateOne({ _id: new ObjectId(_id) }, { $set: data })
        if (!acknowledged) return null
        return { ...data, _id: new ObjectId(_id) } as User
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