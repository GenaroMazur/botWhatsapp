import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import fetch from "cross-fetch"

require("dotenv").config()
export const indexRouter = async (message: whastappObjectResponse): Promise<void> => {
    const token = process.env.TOKEN || ""
    console.log(message.entry[0].changes[0]);
    
    const messageId = message.entry[0]?.changes[0]?.value.messages[0]?.id
    console.log("ESTADO : "+message.entry[0].changes[0].value?.statuses[0]?.status)
    console.log("TIPO : "+message.entry[0].changes[0].field)
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

    if (message.entry[0]?.changes[0]?.value?.errors !== undefined) {
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].value.errors)
        return
    }



    return
}