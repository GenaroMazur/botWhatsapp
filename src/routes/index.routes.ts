require("dotenv").config()
import { Router } from "express";
import { receiveMessage, sendMessage, subsWebhook } from "../controllers/whatsappController";
import { seenMiddleware } from "../middlewares/seenMiddleware";
const router = Router()

//subscription
router.get("/webhooks", subsWebhook)

//listening
router.post("/webhooks", seenMiddleware, receiveMessage, sendMessage)


export default router