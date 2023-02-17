import { configInterface, conversationInterface, list, turnInterface } from "../interfaces/interfaces"
import { dateZoneString, dateNowTimestamp } from "../helpers/helper"
import { SERVER } from "../server"
import { Turn } from "../database/models/Turn"
const server = SERVER.instance
const welcomeMessage = "*¡Bienvenido a Servicios Urbanos S.A!*\n\nPara sacar turno para reclamos ingresar los siguientes datos.\nSu nombre y apellido completos. \n\nPor favor para otros tipos de consultas comunicarse al 0810-444-7823."
const dniMessage = "Ahora Debe ingresar su numero de documento *sin puntos ni comas*.\n Por ejemplo: 44736152"
export const welcomeModel = (num: number) => {

    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: welcomeMessage }
    }
}

export const dniModel = (num: number) => {
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: dniMessage }
    }
}

export const datesModels = async (num: number, conversation: conversationInterface) => {
    let listDate: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Eliga la fecha la cual quiera reservar su turno" },
            "action": {
                "button": "Fechas Disponibles",
                "sections": [
                    {
                        "title": "",
                        "rows": [

                        ]
                    }
                ]
            }
        }
    }

    let dates = await Turn.find({place: conversation.place, date: {
            "$gt": dateZoneString(dateNowTimestamp(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0],
            "$lt": dateZoneString(dateNowTimestamp() + 60 * 60 * 24 * 10, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
        }}).select({ "turns": 0 })
console.log(dates);

dates.forEach(turn => {
    listDate.interactive.action.sections[0].rows.push({ "id": turn.date, "title": turn.date, "description": turn.day })
})
return listDate
}

export const placeModels = async (num: number) => {
    let listPlace: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Elija Lugar donde quiere realizar su turno" },
            "action": {
                "button": "Sucursales",
                "sections": [
                    {
                        "title": "",
                        "rows": [

                        ]
                    }
                ]
            }
        }
    }
    let places: Array<any> = await Turn.find().select({
        "turns": 0,
        "date": 0,
        "day": 0,
        "_id": 0
    })

    places = places.reduce((acumulador: Array<any>, turnoActual: any) => {

        if (!acumulador.includes(turnoActual.place)) {
            acumulador.push(turnoActual.place)
        }
        return acumulador
    }, [])

    places.map((place: string) => {
        listPlace.interactive.action.sections[0].rows.push({ "id": place, "title": place, "description": "a" })
    });
    console.log(listPlace.interactive.action.sections[0].rows);

    return listPlace
}

export const momentModel = (num: number) => {
    return {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Elija a que hora quiere realizar su turno" },
            "action": {
                "button": "Horarios",
                "sections": [
                    {
                        "title": "",
                        "rows": [
                            { "id": "mañana", "title": "mañana", "description": "Sacar turno a la mañana" },
                            { "id": "tarde", "title": "tarde", "description": "Sacar turno a la tarde" }
                        ]
                    }
                ]
            }
        }
    }
}

export const hourModel = (num: number, conversation: conversationInterface) => {
    const config: Array<configInterface> = server.app.locals.config
    let listHours: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Elija a que hora quiere realizar su turno" },
            "action": {
                "button": "Horarios",
                "sections": [
                    {
                        "title": "",
                        "rows": [

                        ]
                    }
                ]
            }
        }
    }
    let hours: Array<{ "id": string, "title": string, "description": string }> = []



    listHours.interactive.action.sections[0].rows = hours

    return listHours
}

export const hourRangeModel = (num: number, conversation: conversationInterface, turn: "mañana" | "tarde") => {
    const config: Array<configInterface> = server.app.locals.config
    let listHours: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Elija a que hora quiere realizar su turno" },
            "action": {
                "button": "Horarios",
                "sections": [
                    {
                        "title": "",
                        "rows": [

                        ]
                    }
                ]
            }
        }
    }
    let hours: Array<{ "id": string, "title": string, "description": string }> = []



    listHours.interactive.action.sections[0].rows = hours

    return listHours
}