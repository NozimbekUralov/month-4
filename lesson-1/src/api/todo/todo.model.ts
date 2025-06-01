import { ObjectId } from "mongodb";

export class TodoModel {
    constructor(
        public userId: ObjectId,
        public title: string,
        public description: string,
        public is_completed: boolean = false,
    ){}
}

export interface Todo {
    _id: ObjectId
    userId: ObjectId
    title: string
    description: string
    is_completed: boolean
}