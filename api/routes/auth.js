import express from "express";
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", /*ClerkExpressRequireAuth(),*/ register)
router.post("/login", /*ClerkExpressRequireAuth(),*/ login)

export default router;