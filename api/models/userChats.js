import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    history: [
        {
            _id:{
                type:String,
                required: true,
            },
            title:{
                type:String,
                required: true,
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
},{timestamps:true})

//check if it exists in database first, if not create
export default mongoose.models.userChats || mongoose.model("userchats", userChatsSchema) 