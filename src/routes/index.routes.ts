import { comunMessage } from "../interfaces/interfaces";
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface";
import { sendToNum } from "../service/sendMessajeToNum";

export const indexRouter =async (message:whastappObjectResponse):Promise<void> => {
    if(message.errors !== undefined){
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.errors)
        return
    }
    console.log(message.statuses.status);
    
    return
}