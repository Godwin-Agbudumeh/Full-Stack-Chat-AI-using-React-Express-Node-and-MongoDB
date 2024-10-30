import express from "express";
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getUserChat } from "../controllers/userChat.js";

const router = express.Router();

router.get("/", /*ClerkExpressRequireAuth(),*/ getUserChat)

export default router;