import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import Chat from './models/chat.js';
import UserChats from './models/userChats.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin:"*",
})) 

app.use(express.json())

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }  
}

//for recieving image from client 
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });
  
//recieves image from client, send to imagekit, and send response back to client
app.get("/api/upload", (req, res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.post("/api/chats", async (req, res)=>{
    const {userId, text} = req.body  
    
    try{
        //creating a new chat
        const newChat = new Chat({
            userId: userId,
            history: [{role:"user", parts:[{text}]}]
        });

        const savedChat = await newChat.save();

        //check if userchats exists
        const userChats = await UserChats.find({userId: userId});

        //if no userchats, create a new one and add the chat in the chats array
        if(!userChats.length){
            const newUserChats = new UserChats({
                userId: userId,
                chats:[
                    {
                        _id: savedChat._id,
                        title: text.substring(0, 40)
                    }
                ]  
            });

            await  newUserChats.save();
        }else{
            //if userchats already exists, push the chat to the existing array
            await UserChats.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title: text.substring(0, 40)
                    }
                }
            } );

            res.status(201).send(newChat._id);
        }     
    }catch(err){
        console.log(err);
        res.status(500).send("error creating chat");
    }
});

app.listen(port, ()=>{
    connect()
    console.log(`server is running on port ${port}`);
})