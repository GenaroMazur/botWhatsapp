import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToNum } from "../service/sendMessajeToNum";
import fetch from "cross-fetch"

export const indexRouter = async (message: whastappObjectResponse): Promise<void> => {
    const messageId = message.entry[0].changes[0].value.messages.messages[0].id
    let responseRead = JSON.stringify({status: "read"})
    fetch("https://graph.facebook.com/v15.0/109330648741829/messages/" + messageId, {
        method: "PUT",
        body:responseRead
    }).then(r=>console.log(r))
    if (message.entry[0].changes[0].value.errors !== undefined) {
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].value.errors)
        return
    }
    console.log("________________________________________________________");
    
    console.log(message.entry[0].changes[0].value.messages);
    console.log(message.entry[0].changes[0].value);
    console.log(message.entry[0].changes[0].value.errors);
    console.log(message.entry[0].changes[0].value.messages.messages[0]);
    
    console.log("________________________________________________________");
    return
}