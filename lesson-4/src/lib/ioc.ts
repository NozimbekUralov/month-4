import { IocContainer } from "tsoa";
import { container } from "tsyringe";

export const iocContainer: IocContainer = {
    get: <T>(controller: T): T => {
        return container.resolve<T>(controller as never);
    }
}