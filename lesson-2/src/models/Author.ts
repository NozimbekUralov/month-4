import { toCapital } from "@/utils";
import { model, Schema } from "mongoose";


export interface IAuthor {
    first_name: string,
    last_name: string,
    birthday: string,
    died: string,
    about: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface CreateAuthor {
    first_name: string,
    last_name: string,
    birthday: string,
    died?: string,
    about: string,
}

const author = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    },
    birthday: {
        type: String,
        required: true,
        trim: true,
    },
    died: {
        type: String,
        trim: true,
    },
    about: {
        type: String,
        required: true,
        trim: true,
        set: toCapital
    }
}, {
    versionKey: false,
    timestamps: true
})

export const AuthorSchema = model("author", author);