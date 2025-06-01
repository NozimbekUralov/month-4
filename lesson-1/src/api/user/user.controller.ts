import { BaseController } from "@/utils/base.controller";
import { Body, Middlewares, Post, Route, Tags } from "tsoa";
import { UserService } from "./user.service";
import { CreateUser, UpdateUser, UserI, UserSchema } from "./user.model";
import { Validate } from "@/lib/zod";


@Route('user')
@Tags('Users')
export class UserController extends BaseController<
    UserI,
    CreateUser,
    UpdateUser,
    UserService
> {
    constructor() {
        super(new UserService())
    }

    @Post('/')
    @Middlewares(Validate(UserSchema))
    async CREATE(@Body() body: CreateUser) {
        return await this.service.create(body)
    }
}