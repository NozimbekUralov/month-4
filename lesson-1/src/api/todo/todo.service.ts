import { BaseService } from "@/utils/base.service";
import { CreateTodo, TodoI, UpdateTodo } from "./todo.model";


export class TodoService extends BaseService<
    TodoI,
    CreateTodo,
    UpdateTodo
> {
    constructor() {
        super('todos');
    }
}