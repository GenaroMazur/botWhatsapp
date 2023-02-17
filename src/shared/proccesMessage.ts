import { sendToUser } from "../service/sendMessajeToNum"
import { datesModels, dniModel, turnReady, momentModel, placeModels, welcomeModel, hourRangeModel } from "./modelsMessages"
import nodePersist from "node-persist"
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface"
import { comunMessage, conversationInterface, turnInterface } from "../interfaces/interfaces"
import { Turn } from "../database/models/Turn"
const nums = "0123456789"

export const processMessage = async (text: string, num: number, conversation: conversationInterface, key: string) => {
    try {

        const userMessage: string = text.toLowerCase()
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
                sendToUser(JSON.stringify(await placeModels(num)))
            } else {
                const errorMessage: comunMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Numero de DNI invalido" },
                    "type": "text",
                    "to": num.toString()
                }
                sendToUser(JSON.stringify(errorMessage))
            }

        } else if (conversation.place !== "" && conversation.date === "") {

            if (userMessage.split("-").length === 3 && userMessage.split("-")[0].length === 4 && userMessage.split("-")[1].length === 2 && userMessage.split("-")[2].length === 2) {

                conversation.date = userMessage
                await nodePersist.updateItem(key, conversation)
                sendToUser(JSON.stringify(momentModel(num)))
            } else {
                const errorMessage: comunMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Fecha invalida invalido" },
                    "type": "text",
                    "to": num.toString()
                }
                sendToUser(JSON.stringify(errorMessage))
            }


        } else if (conversation.document !== "" && conversation.place === "") {

            const place: any = userMessage
            if (await Turn.findOne({ place }).select({ place: 1 }) !== null) {

                conversation.place = place
                await nodePersist.updateItem(key, conversation)
                sendToUser(JSON.stringify(await datesModels(num, conversation)))
            } else {
                const errorMessage: comunMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Sucursal invalida" },
                    "type": "text",
                    "to": num.toString()
                }
                sendToUser(JSON.stringify(errorMessage))
            }

        } else if (conversation.date !== "" && conversation.hour === "") {

            if (userMessage !== "mañana" && userMessage !== "tarde") {
                const hourRange = userMessage.split("-")
                if ( hourRange.length===2 && hourRange[0].length>=6 && hourRange[0].length<=7 && hourRange[0].length>=6 && hourRange[1].length<=7&& hourRange[1].length>=6 && hourRange[1].length<=7 && hourRange[1].includes("hs") && hourRange[0].includes("hs")) {
                    
                    sendToUser(JSON.stringify(turnReady(num, conversation, hourRange)))
                }

            } else {
                sendToUser(JSON.stringify(await hourRangeModel(num, conversation, userMessage)))
            }

        } else {

            const errorMessage: comunMessage = {
                "messaging_product": "whatsapp",
                "text": { "body": "No entiendo su peticion" },
                "type": "text",
                "to": num.toString()
            }
            sendToUser(JSON.stringify(errorMessage))

        }
    } catch (error) {
        console.log(error);
    }
}

export const persistConversation = async (message: whastappObjectResponse): Promise<conversationInterface> => {
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from
    const conversation: conversationInterface = await nodePersist.getItem(cellphoneNum)
    const turn: conversationInterface = { "fullName": null, "document": "", "date": "", "hour": "", "place": "" }
    if (conversation === undefined) {
        await nodePersist.setItem(cellphoneNum, turn)
    }
    return conversation || turn
}