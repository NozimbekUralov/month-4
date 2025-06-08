import { toCapital } from "@/utils";
import { model, Schema } from "mongoose";

export interface IBook {
    title: string;
    pages: number;
    year: number;
    price: number;
    country: string;
    author: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBook {
    title: string;
    pages: number;
    year: number;
    price: number;
    country: string;
    author: string;
    description: string;
}

const book = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    },
    pages: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    }
}, {
    timestamps: true,
    versionKey: false,
})

export const BookSchema = model('book', book)