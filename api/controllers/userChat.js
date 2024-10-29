import UserChats from '../models/userChats.js';

//This is actually a get request, 
//but our backend api, not detecting credentials,
//so i used post to get userId from client, to fix
export const getUserChat = async (req, res)=>{
    //const userId = req.auth.userId;
    const {userId} = req.body;

    try{
        const userChats = await UserChats.find({userId:userId});
    
        //we are sending the userId, _ids and titles of all chats of a particular user
        //it is used by the chatList.jsx to update lists
        res.status(200).send(userChats[0].chats);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching userchats")
    }
}

