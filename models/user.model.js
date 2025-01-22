import mongoose, { Schema } from "mongoose";
import { createHmac, hash, randomBytes } from 'crypto'
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: '/images/default.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
},
    {
        timestamps: true
    })

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return;

    // const salt = randomBytes(16).toString();
    const hashedPassword =await createHmac('sha256', secret)
        .update(user.password)
        .digest('hex')
    user.password = hashedPassword
    next();
})

userSchema.methods.matchPassword = function (password){
    const hashedPassword = createHmac('sha256', secret)
    .update(password)
    .digest('hex')

    return this.password == hashedPassword;
}

const User = mongoose.model('User', userSchema);
export default User