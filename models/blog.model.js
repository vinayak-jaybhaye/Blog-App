import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true,
    }
},
    {
        timestamps: true
    })


const Blog = mongoose.model("Blog", blogSchema)

export default Blog