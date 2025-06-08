import { AuthorSchema, CreateAuthor, IAuthor } from "@/models/Author";
import { isValidObjectId } from "mongoose";
import { Body, Controller, Delete, Get, Post, Put, Route, SuccessResponse, Tags } from "tsoa";


@Route("author")
@Tags("Authors")
export class AuthorController extends Controller {
    constructor() {
        super()
    }
    @Post('/')
    @SuccessResponse(201, 'Created')
    async create(@Body() body: CreateAuthor): Promise<{ id: string }> {
        const { _id } = await AuthorSchema.insertOne(body)
        return { id: _id.toString() }
    }

    @Put('/{id}')
    async update(@Body() body: Partial<IAuthor>, id: string): Promise<IAuthor | { message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid id' }
        }
        const { acknowledged } = await AuthorSchema.updateOne({ _id: id }, body)
        if (!acknowledged) {
            this.setStatus(404)
            return { message: 'Not found' }
        }

        return await AuthorSchema.findOne({ _id: id }) as IAuthor
    }

    @Get('/')
    async getAll(): Promise<IAuthor[]> {
        return await AuthorSchema.find()
    }

    @Get('/{id}')
    async getById(id: string): Promise<IAuthor | { message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid id' }
        }
        const author = await AuthorSchema.findOne({ _id: id })
        if (!author) {
            this.setStatus(404)
            return { message: 'Not found' }
        }
        return author as IAuthor
    }

    @Delete('/{id}')
    async delete(id: string): Promise<{ message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid id' }
        }
        const { acknowledged } = await AuthorSchema.deleteOne({ _id: id })
        if (!acknowledged) {
            this.setStatus(404)
            return { message: 'Not found' }
        }
        return { message: 'Deleted' }
    }
}