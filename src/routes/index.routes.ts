import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToNum } from "../service/sendMessajeToNum";
import fetch from "cross-fetch"

require("dotenv").config()
export const indexRouter = async (message: whastappObjectResponse): Promise<void> => {
    const token = process.env.TOKEN || ""
    const messageId = message.entry[0].changes[0]?.value.messages[0]?.id

    if (messageId !== undefined) {
        let responseRead = {
            "headers": {
                "authorization": token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ status: "read", messaging_product: "whatsapp", messageId })
        }

        fetch("https://graph.facebook.com/v16.0/109330648741829/messages/" + messageId, responseRead).then(r => console.log(r))
        if (message.entry[0].changes[0].value.errors !== undefined) {
            console.log("¡ SUCEDIO UN PROBLEMA !");
            console.error(message.entry[0].changes[0].value.errors)
            return
        }
    }
    return
}