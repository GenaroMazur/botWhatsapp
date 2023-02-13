import { NextFunction, Request, Response } from "express";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";


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
            
        }
    } catch (error) {
        console.log(error)
    }

    return res.status(200)
}