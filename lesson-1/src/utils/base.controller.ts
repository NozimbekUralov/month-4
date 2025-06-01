import { BaseService } from "./base.service";

export class BaseController<
    model extends Document,
    CreateModel,
    UpdateModel,
    Service extends BaseService<model, CreateModel, UpdateModel>
> {
    protected readonly service: Service;

    constructor(service: Service) {
        this.service = service;
    }
}