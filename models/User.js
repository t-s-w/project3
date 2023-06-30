import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
dotenv.config();
const bcrypt = require('bcrypt');

const SALT_ROUNDS = process.env.SALT_ROUNDS

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 4,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})

export default mongoose.model('User', userSchema)