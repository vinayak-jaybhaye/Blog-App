import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
},
    {
        timestamps: true
    })

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;