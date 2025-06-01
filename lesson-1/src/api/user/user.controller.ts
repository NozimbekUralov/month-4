import { Controller, Post, Route, Tags } from 'tsoa'

@Route('user')
@Tags('Users')
export class UserController extends Controller {
    constructor(){
        super()
    }

    @Post('/')
    async CREATE(){
        return "working"
    }
}