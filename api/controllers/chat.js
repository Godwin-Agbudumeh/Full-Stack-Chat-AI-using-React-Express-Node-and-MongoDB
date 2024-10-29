import Chat from '../models/chat.js';
import UserChats from '../models/userChats.js';

export const addChat = async (req, res)=>{
    //const userId = req.auth.userId
    const {userId, text} = req.body ;
    
    try{
        //we are creating a new chat from the dashboard page ie DashboardPage.jsx
        //the chat is saved in the chats collection of our database, it might be the user's first time or not
        //the chat is just saved in chats collection, and it will have a unique id, which we will call chat id.
        const newChat = new Chat({
            userId: userId,
            history: [{role:"user", parts:[{text}]}]
        });

        const savedChat = await newChat.save();

        //we check if userchats exists, ie if the user has created a chat before and has a userId in our database
        //we want to know if it is user's first time, ie if the user has a profile in our userChats collection in our database
        const userChats = await UserChats.find({userId: userId});

        //if no user in our userchats collection, we create a new one
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
            //if userchats already exists, we push the chatid and title created from the new chat 
            //to the existing array of our userchats collection
            await UserChats.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title: text.substring(0, 40)
                    }
                }
            } );

            //res.status(201).send(newChat._id);
        }
        //here we now send the chat id our newly created chat
        //it is used by the dashboardPage ie dashboardPage.jsx to redirect to /dashboard/chats/:id
        res.status(201).send(newChat._id);     
    }catch(err){
        console.log(err);
        res.status(500).send("error creating chat");
    }
}

//This is actually a get request, 
//but our backend api, not detecting credentials,
//so i used post to get userId from client, to fix
export const getChat = async (req, res)=>{
    //const userId = req.auth.userId;
    const {userId} = req.body;

    try{
        //we are finding chat that matches the criteria below
        const chat = await Chat.findOne({_id:req.params.id, userId:userId});
    
        //we are sending the chat details of a single chat id, it contains roles, the texts
        //it is needed by our chatPage.jsx page to show chats and question and answer just saved
        //the question and answer was saved by our prompt.jsx inside a single chat id by app.put(/api/chats/:id)
        //it was designed like that
        res.status(200).send(chat);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching chat")
    }
}

export const updateChat = async (req, res)=>{
    //const userId = req.auth.userId;
    const {userId, question, answer, img} = req.body;

    //we are trying to get the answer from the ai
    //the question from client might be undefined or contains only image
    //we will just push the anwser into existing array of a particular chat id inside history
    const newItems = [
        ...(question 
            ? [{role:"user", parts:[{text:question}], ...(img && { img })}]
            : []),
        {role: "model", parts: [{text: answer}]} 
    ];
    try{
        const updatedChat = await Chat.updateOne({_id:req.params.id, userId:userId}, {
            $push:{
              history:{
                $each: newItems,
            } 
            }
        })
        
        res.status(200).send(updatedChat);
    }catch(err){
        console.log(err);
        res.status(500).send("Error adding conversation")
    }
}


