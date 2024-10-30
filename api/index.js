import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chats.js";
import userChatRoutes from "./routes/userChats.js";

const port = process.env.PORT || 3000;
const app = express();
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }  
}

app.use(cors({
    origin: ['https://godwin-ai-client.devlyf.com', 'http://localhost:5173'],
    credentials: true,
})) 

connect()

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

app.get("/", (req, res)=>{
    res.send("server is running, thanks");
})

app.listen(port, ()=>{
    console.log(`our server is running on port ${port}`);
})