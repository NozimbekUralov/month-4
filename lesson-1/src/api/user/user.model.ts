import { ObjectId } from "mongodb"
import { Todo } from "../todo/todo.model"

export class UserModel {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ){}
}

export interface User {
    _id: ObjectId
    name: string,
    email: string,
    password: string
    todos: Todo[]
}
