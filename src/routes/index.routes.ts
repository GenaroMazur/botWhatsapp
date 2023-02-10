import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToNum } from "../service/sendMessajeToNum";

export const indexRouter =async (message:whastappObjectResponse):Promise<void> => {
    if(message.entry[0].changes[0].errors !== undefined){
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].errors)
        return
    }
    
    console.log(message.entry[0].changes[0].statuses);
    console.log(message.entry[0].changes[0].messages?.contacts);
    console.log(message.entry[0].changes[0].errors);
    console.log(message.entry[0].changes[0]);

    return
}