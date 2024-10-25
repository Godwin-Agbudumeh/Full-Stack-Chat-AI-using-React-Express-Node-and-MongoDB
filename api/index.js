import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';

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

app.post("/api/chats", (req, res)=>{
    const {text} = req.body  
    
    try{

    }catch(err){
        
    }
});

app.listen(port, ()=>{
    connect()
    console.log(`server is running on port ${port}`);
})