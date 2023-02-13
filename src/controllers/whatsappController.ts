import { NextFunction, Request, Response } from "express";
import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToUser } from "../service/sendMessajeToNum";


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
    } catch (error) {
        console.log(error)
    }

    return res.status(200)
}

export const sendMessage =async (req:Request, res:Response) => {
    try {
        const whastappMessage:whastappObjectResponse = req.body
        const echo = whastappMessage.entry[0].changes[0].value.messages[0].text?.body || "ERROR"


        const response:comunMessage = {
            "messaging_product":"whatsapp",
            "type":"text",
            "to":"543764560397",
            "text":{body:echo}
        }
        console.log(response);
        
        sendToUser(JSON.stringify(response))
        res.status(200).end()
    } catch (error) {
        console.log(error);
    }
    return
}