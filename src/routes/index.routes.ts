import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToNum } from "../service/sendMessajeToNum";

export const indexRouter =async (message:whastappObjectResponse):Promise<void> => {
    if(message.entry[0].changes[0].value.errors !== undefined){
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].value.errors)
        return
    }
    
    console.log(message.entry[0].changes[0].value.messages);
    console.log(message.entry[0].changes[0].value);
    console.log(message.entry[0].changes[0].value.errors);
    console.log(message.entry[0].changes[0].value.contacts);

    return
}