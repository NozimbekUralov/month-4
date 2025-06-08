import { AuthorSchema } from "@/models/Author";
import { BookSchema, CreateBook, IBook } from "@/models/Book";
import { isValidObjectId } from "mongoose";
import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";

@Route('book')
@Tags('Books')
export class BookController extends Controller {
    constructor() {
        super()
    }

    @SuccessResponse(201, 'Created')
    @Post('/')
    async create(@Body() body: CreateBook): Promise<IBook | null> {
        const { _id } = await BookSchema.insertOne(body)
        if (!_id) {
            this.setStatus(500)
            return null
        }
        return await BookSchema.findById(_id)
    }

    @Put('{id}')
    async update(@Body() body: Partial<IBook>, @Path() id: string): Promise<IBook | { message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid book id' }
        }
        if (body.author && isValidObjectId(body.author)) {
            const author = await AuthorSchema.findById(body.author)
            if (!author) {
                this.setStatus(404)
                return { message: 'Author not found' }
            }
        }

        const { acknowledged } = await BookSchema.updateOne({ _id: id }, body)
        if (!acknowledged) {
            this.setStatus(500)
            return { message: 'Something went wrong' }
        }
        return await BookSchema.findById(id) as IBook
    }

    @Get('/')
    async getAll(): Promise<IBook[]> {
        return await BookSchema.find()
    }

    @Get('{id}')
    async getById(@Path() id: string): Promise<IBook | { message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid book id' }
        }
        const book = await BookSchema.findById(id)
        if (!book) {
            this.setStatus(404)
            return { message: 'Book not found' }
        }
        return book as IBook
    }

    @Delete('{id}')
    async delete(@Path() id: string): Promise<{ message: string }> {
        if (!isValidObjectId(id)) {
            this.setStatus(400)
            return { message: 'Invalid book id' }
        }
        const { acknowledged } = await BookSchema.deleteOne({ _id: id })
        if (!acknowledged) {
            this.setStatus(500)
            return { message: 'Something went wrong' }
        }
        return { message: 'Book deleted' }
    }
}
