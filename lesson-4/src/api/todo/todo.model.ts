import { ObjectId } from "mongodb";

export class TodoModel {
    constructor(
        public title: string,
        public description: string,
    ) { }
}

export interface CreateTodo extends TodoModel {
    is_completed: boolean
    user_id: string
}
export interface UpdateTodo extends Partial<{
    title: string
    user_id: string
    description: string
    is_completed: boolean
}> { }

export interface Todo {
    _id: ObjectId
    user_id: string
    title: string
    description: string
    is_completed: boolean
}