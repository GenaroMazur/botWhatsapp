require("dotenv").config()
import { Router } from "express";
import { receiveMessage, subsWebhook } from "../controllers/whatsappController";
import { seenMiddleware } from "../middlewares/seenMiddleware";
const router = Router()

//subscription
router.get("/webhooks", subsWebhook)

//listening
router.post("/webhooks",seenMiddleware,receiveMessage)


export default router