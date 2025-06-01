import { email, name, password } from "@/lib/zod";
import { z } from "zod";
import { TodoI } from "../todo/todo.model";
import { ObjectId } from "mongodb";

export const UserSchema = z.object({
    email,
    password,
    name,
})

export interface UserI extends Document {
    todos: TodoI[];
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
}

export type CreateUser = z.infer<typeof UserSchema>
export type UpdateUser = Partial<CreateUser>