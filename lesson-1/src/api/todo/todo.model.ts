import { description, title } from "@/lib/zod";
import { ObjectId } from "mongodb";
import { z } from "zod";

const TodoSchema = z.object({
    title,
    description,
    userId: z.string().nonempty()
})

export interface TodoI extends Document {
    _id: ObjectId
    title: string
    description: string
    userId: ObjectId
    is_completed: boolean
}

export type CreateTodo = z.infer<typeof TodoSchema>
export type UpdateTodo = Partial<CreateTodo>
