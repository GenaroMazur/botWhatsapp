require("dotenv").config()
import { Router } from "express";
import { receiveMessage, sendMessage, subsWebhook } from "../controllers/whatsappController";
import { seenMiddleware } from "../middlewares/seenMiddleware";
import turn from "./turn.routes"
const router = Router()

//subscription
router.get("/webhooks", subsWebhook)

//listening
router.post("/webhooks", seenMiddleware, receiveMessage, sendMessage)

router.use("/turnos", turn )

export default router