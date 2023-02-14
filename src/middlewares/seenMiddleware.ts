import { NextFunction, Request, Response } from "express";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import fetch from "cross-fetch"

const token = process.env.TOKEN || ""


export const seenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const message: whastappObjectResponse = req.body
        if (message.entry[0].changes[0].value.messages) {

            const messageId = message.entry[0].changes[0].value.messages[0].id

            if (messageId !== undefined) {
                let responseRead = {
                    "headers": {
                        "authorization": token,
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ status: "read", messaging_product: "whatsapp", message_id: messageId })
                }
                fetch("https://graph.facebook.com/v16.0/109330648741829/messages", responseRead)
            }
        }
    } catch (error) {
        console.log(error);
    }

    next()
}