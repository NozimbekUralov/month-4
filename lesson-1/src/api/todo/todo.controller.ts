import { BaseController } from "@/utils/base.controller";
import { Route, Tags } from "tsoa";
import { TodoService } from "./todo.service";
import { CreateTodo, TodoI, UpdateTodo } from "./todo.model";


@Route('todo')
@Tags('Todos')
export class TodoController extends BaseController<
    TodoI,
    CreateTodo,
    UpdateTodo,
    TodoService
> {
    constructor() {
        super(new TodoService());
    }
}