import { BaseService } from "@/utils/base.service";
import { CreateUser, UpdateUser, UserI } from "./user.model";


export class UserService extends BaseService<
    UserI,
    CreateUser,
    UpdateUser
> {
    constructor() {
        super("users");
    }
}