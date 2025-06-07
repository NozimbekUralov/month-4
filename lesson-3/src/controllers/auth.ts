import { IUser } from "@/models/User";
import { Controller, Post, Route, SuccessResponse, Tags } from "tsoa";

@Route('auth')
@Tags("Auth")
export class AuthController extends Controller {
    constructor() {
        super()
    }

    @SuccessResponse(201, "Created")
    @Post('register')
    async register(): Promise<{ id: string }> {
        return { id: '' }
    }

    @Post('login')
    async login(): Promise<IUser> {
        return {} as IUser
    }
}