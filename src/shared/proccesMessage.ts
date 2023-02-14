import { sendToUser } from "../service/sendMessajeToNum"
import { dniModel, welcomeModel } from "./modelsMessages"
import nodePersist from "node-persist"
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface"
import { comunMessage, turnInterface } from "../interfaces/interfaces"
const nums = "0123456789"

export const processMessage = async(text:string, num:number, conversation:turnInterface)=>{
    const userMessage:string = text.toLowerCase()
    console.log(conversation);
    if(conversation.fullName===""){
        if(userMessage.length>4){
            conversation.fullName=text
            await nodePersist.updateItem(`${num}`, conversation)
            sendToUser(JSON.stringify(dniModel(num)))
        } else {
            const errorMessage:comunMessage={
                "messaging_product":"whatsapp",
                "text":{"body":"nombre invalido, debe ser mayor a 4 caracteres"},
                "type":"text",
                "to":num.toString()
            }
            sendToUser(JSON.stringify(errorMessage))
        }
    } else {
        conversation.fullName=""
        await nodePersist.updateItem(`${num}`, conversation)
        sendToUser(JSON.stringify(welcomeModel(num)))
    }
}

export const persistConversation = async (message:whastappObjectResponse)=>{
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from
    const conversation:turnInterface = await nodePersist.getItem(cellphoneNum)
    const turn:turnInterface = {"fullName":null, "document":"", "date":"", "hour":"", "place":""}
    if(conversation === undefined){
        await nodePersist.setItem(cellphoneNum, turn)
    }
    return conversation || turn
}