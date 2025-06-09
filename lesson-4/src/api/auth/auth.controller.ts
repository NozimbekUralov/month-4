import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { injectable } from "tsyringe";
import { UserService } from "../user/user.service";
import { UserModel } from "../user/user.model";
import { JWT } from "@/lib/jwt";

@injectable()
@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    constructor(
        protected readonly userService: UserService
    ) {
        super();
    }

    @SuccessResponse('201', 'Created')
    @Post('/register')
    async register(@Body() body: UserModel) {
        const res = await this.userService.create(body);
        if (!res) {
            this.setStatus(500)
            return { message: 'Something went wrong' }
        }
        return true
    }

    @Post('/login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.userService.getOneByEmail(body.email);
        if (!user || user.password != body.password) {
            this.setStatus(404)
            return { message: 'User not found' }
        }
        const token = await JWT.generateToken({ _id: user._id.toString() })
        return { token }
    }
}