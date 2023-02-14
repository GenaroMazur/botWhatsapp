import { sendToUser } from "../service/sendMessajeToNum"
import { datesModels, dniModel, placeModels, welcomeModel } from "./modelsMessages"
import nodePersist from "node-persist"
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface"
import { comunMessage, turnInterface } from "../interfaces/interfaces"
const nums = "0123456789"

export const processMessage = async (text: string, num: number, conversation: turnInterface, key: string) => {
    const userMessage: string = text.toLowerCase()
    console.log(conversation);
    if (conversation.fullName === "") {

        if (userMessage.length > 4) {
            conversation.fullName = text
            await nodePersist.updateItem(key, conversation)
            sendToUser(JSON.stringify(dniModel(num)))
        } else {
            const errorMessage: comunMessage = {
                "messaging_product": "whatsapp",
                "text": { "body": "nombre invalido, debe ser mayor a 4 caracteres" },
                "type": "text",
                "to": num.toString()
            }
            sendToUser(JSON.stringify(errorMessage))
        }

    } else if (conversation.fullName === null) {

        conversation.fullName = ""
        await nodePersist.updateItem(key, conversation)
        sendToUser(JSON.stringify(welcomeModel(num)))

    } else if (conversation.fullName !== "" && conversation.fullName !== null && conversation.document === "") {

        if ((userMessage.length == 7 || userMessage.length == 8) && userMessage.split("").every(value => nums.includes(value))) {
            conversation.document = userMessage
            await nodePersist.updateItem(key, conversation)
            sendToUser(JSON.stringify(await datesModels(num)))
        } else {
            const errorMessage: comunMessage = {
                "messaging_product": "whatsapp",
                "text": { "body": "Numero de DNI invalido" },
                "type": "text",
                "to": num.toString()
            }
            sendToUser(JSON.stringify(errorMessage))
        }

    } else if (conversation.document !== "" && conversation.date === "") {

        if(userMessage.split("-").length===2 && userMessage.split("-")[0].length===2 && userMessage.split("-")[1].length===2){

            conversation.date = userMessage
            await nodePersist.updateItem(key, conversation)
            sendToUser(JSON.stringify(placeModels(num)))
        } else {

        }


    } else if (conversation.date!== "" && conversation.place === "") {
        
        const place:any = userMessage
        conversation.place = place
        await nodePersist.updateItem(key, conversation)
        sendToUser(JSON.stringify(welcomeModel(num)))

    } else {

        const errorMessage: comunMessage = {
            "messaging_product": "whatsapp",
            "text": { "body": "No entiendo su peticion" },
            "type": "text",
            "to": num.toString()
        }
        sendToUser(JSON.stringify(errorMessage))

    }
}

export const persistConversation = async (message: whastappObjectResponse) => {
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from
    const conversation: turnInterface = await nodePersist.getItem(cellphoneNum)
    const turn: turnInterface = { "fullName": null, "document": "", "date": "", "hour": "", "place": "" }
    if (conversation === undefined) {
        await nodePersist.setItem(cellphoneNum, turn)
    }
    return conversation || turn
}