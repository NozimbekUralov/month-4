import { Body, Controller, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { TodoService } from "./todo.service";
import { TodoModel } from "./todo.model";

@injectable()
@Route("todo")
@Tags("Todos")
export class TodoController extends Controller {
    constructor(
        @inject(TodoService)
        protected readonly service: TodoService
    ) {
        super();
    }

    @SuccessResponse("201", "Created")
    @Post('/')
    @Security("BearerAuth")
    async create(@Body() data: TodoModel, @Request() req: any) {
        const { _id } = req.user;
        const todo = await this.service.create({ ...data, user_id: _id, is_completed: false });
        if (!todo) {
            this.setStatus(500);
            return;
        }
        return todo;
    }

    @Put('/{id}')
    @Security("BearerAuth")
    async update(@Request() req: any, @Path() id: string, @Body() data: { title: string, description: string, is_completed: boolean }) {
        const { _id } = req.user;
        const todo = await this.service.getOneTodo(id);
        if (!todo || todo.user_id !== _id) {
            this.setStatus(404);
            return;
        }
        const newTodo = await this.service.update(id, data);
        if (!newTodo) {
            this.setStatus(500);
            return;
        }
        return newTodo;
    }
}