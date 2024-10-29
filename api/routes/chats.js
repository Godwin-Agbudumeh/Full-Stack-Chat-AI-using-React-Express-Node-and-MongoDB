import express from "express";
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { addChat, getChat, updateChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/", /*ClerkExpressRequireAuth(),*/ addChat)
router.post("/:id", /*ClerkExpressRequireAuth(),*/ getChat)
router.put("/:id", /*ClerkExpressRequireAuth(),*/ updateChat)

export default router;