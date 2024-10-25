import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    history: [
        {
            role:{
                type:String,
                enum: ["user" | "model"],
                required: true,
            },
            parts:[
                {
                    text:{
                        type:String,
                        required:true,
                    }
                }
            ],
            img:{
                type:String,
                required:false,
            }
        }
    ]
},{timestamps:true})

//check if it exists in database first, if not create
export default mongoose.models.userChats || mongoose.model("userchats", userChatsSchema) 