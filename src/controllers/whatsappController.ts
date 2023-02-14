import { NextFunction, Request, Response } from "express";
import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToUser } from "../service/sendMessajeToNum";
import { processMessage } from "../shared/proccesMessage";


export const subsWebhook = async (req: Request, res: Response) => {
const myToken = process.env.TOKEN
const tokenHook = req.query["hub.verify_token"]
const challenge: any = req.query["hub.challenge"]

    if(tokenHook != null && challenge != null && myToken === tokenHook){
        res.send(challenge)
    } else {
        res.status(400).end()
    }
}

export const receiveMessage =async (req:Request, res:Response, next:NextFunction) => {
    const whatsappMessage:whastappObjectResponse = req.body
    try {
        if(whatsappMessage.object === "whatsapp_business_account" && whatsappMessage.entry[0].changes[0].field === "messages" && whatsappMessage.entry[0].changes[0].value.messaging_product==="whatsapp"){
            const message = whatsappMessage.entry[0].changes[0].value.messages
            if(typeof message !== "undefined"){
                next()
            }
        }
        res.status(200).send("EVENT_RECEIVED")
    } catch (error) {
        console.log(error)
        res.status(200).send("EVENT_RECEIVED")
    }

}

export const sendMessage =async (req:Request, res:Response) => {
    try {
        const whastappMessage:whastappObjectResponse = req.body
        const text = whastappMessage.entry[0].changes[0].value.messages[0].text?.body || "ERROR"


        processMessage(text, 3764560397)
    } catch (error) {
        console.log(error);
    }
    return
}