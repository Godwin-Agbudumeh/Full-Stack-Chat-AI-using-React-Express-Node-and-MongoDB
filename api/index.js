import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import Chat from './models/chat.js';
import UserChats from './models/userChats.js';
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
//import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
// import { clerkMiddleware } from '@clerk/express'
// import {requireAuth} from '@clerk/express';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: true,
    // to use credentials sent from client on fetch
    credentials: true,
})) 

app.use(express.json())

//app.use(clerkMiddleware());

// const legacyRequireAuth = (req, res, next) => {
//     if (!req.auth) {
//       return next(new Error('Unauthenticated'))
//     }
//     next()
//   }

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
  
//to authenticate imagekit in client via backend, rules according to the docs
//note: the upload to imagekit server takes place in client
//but it must be authenticated first by this backend
app.get("/api/upload", (req, res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.post("/api/chats", /*ClerkExpressRequireAuth()*/ async (req, res)=>{
    //const userId = req.auth.userId
    const {userId, text} = req.body ;
    
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


//This is actually a get request, 
//but our backend api, not detecting credentials,
//so i used post to get userId from client, to fix
app.post("/api/userchats", /*ClerkExpressRequireAuth(),*/ async (req, res)=>{
    //const userId = req.auth.userId;
    const {userId} = req.body;

    try{
        const userChats = await UserChats.find({userId:userId});
    
        res.status(200).send(userChats[0].chats);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching userchats")
    }
})

//This is actually a get request, 
//but our backend api, not detecting credentials,
//so i used post to get userId from client, to fix
app.post("/api/chats/:id", /*ClerkExpressRequireAuth(),*/ async (req, res)=>{
    //const userId = req.auth.userId;
    const {userId} = req.body;

    try{
        const chat = await Chat.findOne({_id:req.params.id, userId:userId});
    
        res.status(200).send(chat);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching chat")
    }
})

// app.get("/api/test", /*legacyRequireAuth, ClerkExpressWithAuth(), requireAuth({ signInUrl: '/sign-in' }), */ClerkExpressRequireAuth(),(req, res)=>{
//     const userId = req.auth.userId;
//     //const userId = req.auth
//     console.log(userId)
   
//     console.log('success console')
//     res.status(200).send("success boy")
// })

//to handle errors for clerk authentication middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(401).send('Unauthenticated!')
//   }) 

app.listen(port, ()=>{
    connect()
    console.log(`server is running on port ${port}`);
})