import { IUser, UserSchema } from "@/models/User";
import { isValidObjectId } from "mongoose";
import { Body, Controller, Delete, Path, Put, Route, Tags } from "tsoa";

@Route("user")
@Tags("Users")
export class UserController extends Controller {
    constructor() {
        super()
    }

    @Put("{id}")
    async update(@Path() id: string, @Body() body: Partial<IUser>): Promise<IUser | { message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: "Invalid id" }
        }
        const user = await UserSchema.findById(id)
        if (!user) {
            this.setStatus(404)
            return { message: "User not found" }
        }

        if (body.email && user.email !== body.email) {
            const data = await UserSchema.findOne({ email: body.email })
            if (data) {
                this.setStatus(400)
                return { message: "Email already exists" }
            }
        }
        const { acknowledged } = await UserSchema.updateOne({ _id: id }, body)
        if (!acknowledged) {
            this.setStatus(500)
            return { message: "Something went wrong" }
        }
        return await UserSchema.findById(id) as IUser
    }

    @Delete("{id}")
    async delete(@Path() id: string): Promise<{ message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: "Invalid id" }
        }
        const { acknowledged } = await UserSchema.deleteOne({ _id: id })
        if (!acknowledged) {
            this.setStatus(500)
            return { message: "Something went wrong" }
        }
        return { message: "User deleted" }
    }
}