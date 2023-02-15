import { sendToUser } from "../service/sendMessajeToNum"
import { datesModels, dniModel, hourModel, momentModel, placeModels, welcomeModel } from "./modelsMessages"
import nodePersist from "node-persist"
import { whastappObjectResponse } from "../interfaces/whatsappResponseInterface"
import { comunMessage, turnInterface } from "../interfaces/interfaces"
const nums = "0123456789"

export const processMessage = async (text: string, num: number, conversation: turnInterface, key: string) => {
    try {

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
                sendToUser(JSON.stringify(datesModels(num)))
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

            if (userMessage.split("-").length === 2 && userMessage.split("-")[0].length === 2 && userMessage.split("-")[1].length === 2) {

                conversation.date = userMessage
                await nodePersist.updateItem(key, conversation)
                console.log(conversation);
                sendToUser(JSON.stringify(placeModels(num)))
            } else {
                const errorMessage: comunMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Fecha invalida invalido" },
                    "type": "text",
                    "to": num.toString()
                }
                sendToUser(JSON.stringify(errorMessage))
            }


        } else if (conversation.date !== "" && conversation.place === "") {

            const place: any = userMessage
            if (place === "terminal unam" || place === "shopping posadas" || place === "obera bicentenario") {

                conversation.place = place
                await nodePersist.updateItem(key, conversation)
                console.log(conversation);
                sendToUser(JSON.stringify(momentModel(num)))
            } else {
                const errorMessage: comunMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Sucursal invalida" },
                    "type": "text",
                    "to": num.toString()
                }
                sendToUser(JSON.stringify(errorMessage))
            }

        } else if (conversation.place !== "" && conversation.hour === "") {

            if (userMessage !== "mañana" && userMessage !== "tarde") {

                const hora = userMessage.split(":")
                if (hora.length === 2, hora[0].length === 2, hora[1].length === 4) {
                    conversation.hour = userMessage
                    await nodePersist.updateItem(key, conversation)
                    console.log(conversation);
                    sendToUser(JSON.stringify(welcomeModel(num)))
                    await nodePersist.clear()
                } else {
                    const errorMessage: comunMessage = {
                        "messaging_product": "whatsapp",
                        "text": { "body": "Hora invalida" },
                        "type": "text",
                        "to": num.toString()
                    }
                    sendToUser(JSON.stringify(errorMessage))
                }

            } else {
                sendToUser(JSON.stringify(hourModel(num, conversation, userMessage)))
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

export const persistConversation = async (message: whastappObjectResponse) => {
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from
    const conversation: turnInterface = await nodePersist.getItem(cellphoneNum)
    const turn: turnInterface = { "fullName": null, "document": "", "date": "", "hour": "", "place": "" }
    if (conversation === undefined) {
        await nodePersist.setItem(cellphoneNum, turn)
    }
    return conversation || turn
}