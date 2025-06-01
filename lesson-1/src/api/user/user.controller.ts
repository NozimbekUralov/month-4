import { Controller, Get, Request, Route, Security, Tags } from 'tsoa'
import { inject, injectable } from 'tsyringe'
import { UserService } from './user.service'
import { User } from './user.model'
import { TodoService } from '../todo/todo.service'

@injectable()
@Route('user')
@Tags('Users')
export class UserController extends Controller {
    constructor(
        @inject(UserService)
        protected readonly service: UserService,

        @inject(TodoService)
        protected readonly todoService: TodoService

    ) {
        super()
    }

    @Get('/me')
    @Security('BearerAuth')
    async GET_ONE_BY_ID(@Request() req: any): Promise<User | null> {
        const { _id } = req.user
        const todos = await this.todoService.getTodosByUserId(_id)
        const user = await this.service.getOneById(_id)
        user!.todos = todos
        return user
    }
}
