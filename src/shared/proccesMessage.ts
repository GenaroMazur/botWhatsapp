import { sendToUser } from "../service/sendMessajeToNum"
import { welcomeModel } from "./modelsMessages"
const nums = "0123456789"

export const processMessage = (text:string, num:number)=>{
    const userMessage:string = text.toLowerCase()
    if(userMessage.split("").every(value=>nums.includes(value)) && userMessage.length > 6 && userMessage.length < 10){
        
    } else {
        sendToUser(JSON.stringify(welcomeModel(num)))
    }
}