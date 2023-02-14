import { sendToUser } from "../service/sendMessajeToNum"
import { welcomeModel } from "./modelsMessages"
import nodePersist from "node-persist"
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface"
const nums = "0123456789"

export const processMessage = (text:string, num:number)=>{
    const userMessage:string = text.toLowerCase()
    if(userMessage.split("").every(value=>nums.includes(value)) && userMessage.length > 6 && userMessage.length < 10){
        
    } else {
        sendToUser(JSON.stringify(welcomeModel(num)))
    }
}

export const persistConversation = async (message:whastappObjectResponse)=>{
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from
    const conversation = await nodePersist.getItem(cellphoneNum)

    console.log("conversacion : ",conversation);
    
}