import { toCapital } from '@/utils'
import { model, Schema } from 'mongoose'

export interface IUser {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string
    createdAt: Date,
    updatedAt: Date,
}

export interface RegisterUser {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string
}

export interface LoginUser {
    email: string,
    password: string
}

const User = new Schema({
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
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [new RegExp("^\\+?998\\d{9}$"), "insert proper phone number"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [new RegExp("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$"), "insert proper email address"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        match: [new RegExp("^[A-Za-z0-9]{6,}$"), "Password must be at least 6 characters and contain only letters and numbers"]
    },
}, {
    versionKey: false,
    timestamps: true
})
export const UserSchema = model("user", User)
