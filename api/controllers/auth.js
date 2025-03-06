import User from "../models/user.js";
import CryptoJS from "crypto-js";
//const jwt = require("jsonwebtoken");

//REGISTER
export const register = async (req, res)=>{
     
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
     });

   try{
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
   }catch(err){
        res.status(500).json(err);   
   }
}

//LOGIN
export const login = async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});

        if(!user){
            return res.status(401).json("Wrong credentials!")
        };

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SECRET
        );
        
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
            return res.status(401).json("Wrong credentials!");
        }
    
        const {password, ...others} = user?._doc;

        return res.status(200).json(others); 
    }catch(err){
        return res.status(500).json(err);
    }
}
