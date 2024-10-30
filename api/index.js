import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chats.js";
import userChatRoutes from "./routes/userChats.js";
import UserChats from './models/userChats.js';

const port = process.env.PORT || 3000;
const app = express();
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }  
}

app.use(cors({
    origin: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    // to use credentials sent from client on fetch
    credentials: true,
})) 

//app.use(cors());

app.use(express.json())

app.use("/api/chats", chatRoutes);
app.use("/api/userchats", userChatRoutes)

//for authentication for imagekit from client 
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });
  
//to authenticate imagekit in client via backend, rules according to the docs
//note: the upload to imagekit server takes place in client
//but it must be authenticated first by this backend
app.get("/api/imageupload", (req, res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.get("/", async(req, res)=>{
    //return res.send("server is running, thanks");
    const userId = "user_2no5Wei5fmHnEPP9vMueNFt5WBb";

    try{
        const userChats = await UserChats.find({userId:userId});
    
        //we are sending the userId, _ids and titles of all chats of a particular user
        //it is used by the chatList.jsx to update lists
        res.status(200).send(userChats[0].chats);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching userchats")
    }
})

app.get("/test", async(req, res)=>{
    //const {userId} = req.body;
    const userId = "user_2no5Wei5fmHnEPP9vMueNFt5WBb";

    try{
        const userChats = await UserChats.find({userId:userId});
    
        //we are sending the userId, _ids and titles of all chats of a particular user
        //it is used by the chatList.jsx to update lists
        res.status(200).send(userChats[0].chats);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching userchats")
    }
})

app.listen(port, ()=>{
    connect()
    console.log(`our server is running on port ${port}`);
})