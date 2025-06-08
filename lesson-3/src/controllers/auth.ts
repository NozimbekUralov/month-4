import { IUser, LoginUser, RegisterUser, UserSchema } from "@/models/User";
import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";

@Route('auth')
@Tags("Auth")
export class AuthController extends Controller {
    constructor() {
        super()
    }

    @SuccessResponse(201, "Created")
    @Post('register')
    async register(@Body() body: RegisterUser): Promise<{ id: string } | null> {

        const { _id } = await UserSchema.insertOne(body)
        if (!_id) {
            this.setStatus(500)
            return null
        }
        return { id: _id.toString() }
    }

    @Post('login')
    async login(@Body() body: LoginUser): Promise<IUser | null> {
        const user = await UserSchema.findOne({ email: body.email });
        if (!user || user.password !== body.password) {
            this.setStatus(404)
            return null
        }
        return user as IUser
    }
}