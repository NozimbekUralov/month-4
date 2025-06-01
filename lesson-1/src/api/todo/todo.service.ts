import { Database } from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { singleton } from "tsyringe";
import { CreateTodo, Todo, UpdateTodo } from "./todo.model";

@singleton()
export class TodoService {
    protected readonly collection: Collection = Database.conn.collection("todos");
    async create(todo: CreateTodo): Promise<Todo | null> {
        const { acknowledged, insertedId } = await this.collection.insertOne(todo)
        if (acknowledged) return this.getOneTodo(insertedId.toString())
        return null
    }

    async getOneTodo(_id: string): Promise<Todo | null> {
        const todo = await this.collection.findOne({ _id: new ObjectId(_id) })
        return todo as Todo
    }

    async update(_id: string, todo: UpdateTodo): Promise<Todo | null> {
        const { acknowledged } = await this.collection.updateOne({ _id: new ObjectId(_id) }, { $set: todo })
        if (!acknowledged) return null
        return { _id: new ObjectId(_id), ...todo } as Todo
    }

    async getTodosByUserId(user_id: string): Promise<Todo[]> {
        const todos = await this.collection.find({ user_id }).toArray()
        return todos as Todo[]
    }
}