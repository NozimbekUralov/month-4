import { Controller, Post, Route, SuccessResponse, Tags } from "tsoa";

@Route('book')
@Tags('Books')
export class BookController extends Controller {
    constructor() {
        super()
    }

    @SuccessResponse(201, 'Created')
    @Post('/')
    async create(): Promise<{ id: string }> {
        return { id: '' }
    }
}