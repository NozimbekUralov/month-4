import { Database } from "@/lib/mongodb";
import { Collection, ObjectId, WithId } from "mongodb";

export class BaseService<model extends Document, CreateModel, UpdateModel> {
    protected readonly collection: Collection<model>;

    constructor(collectionName: string) {
        this.collection = Database.conn.collection<model>(collectionName);
    }

    async create(data: CreateModel): Promise<WithId<model>> {
        const result = await this.collection.insertOne(data as any);
        return await this.collection.findOne({ _id: result.insertedId } as any) as WithId<model>;
    }

    async update(_id: ObjectId, data: UpdateModel): Promise<WithId<model> | null> {
        await this.collection.updateOne({ _id } as any, { $set: data } as any);
        return await this.collection.findOne({ _id } as any);
    }

    async delete(_id: ObjectId): Promise<boolean> {
        const result = await this.collection.deleteOne({ _id } as any);
        return result.deletedCount === 1;
    }

    async getOneById(_id: ObjectId): Promise<WithId<model> | null> {
        return await this.collection.findOne({ _id } as any);
    }
}