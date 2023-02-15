import { list, turnInterface } from "../interfaces/interfaces"
import { dateZoneString, dateNowTimestamp } from "../helpers/helper"
import { SERVER } from "../server"
const config = SERVER.instance.app.locals.config
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

export const datesModels = (num: number) => {
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
                            ///AQUI VAN LAS FECHAS
                        ]
                    }
                ]
            }
        }
    }

    for(let x = 1; x<14; x++){
        const date = dateZoneString(dateNowTimestamp()*60 * 60 * 24 * x, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
        const day = new Date(date).getDay()
        if(day!==6){
            const option = { "id": date.slice(5), "title": date.slice(5), "description": `dia ${config[0].days[day].day} ${date.slice(8)}` }
            console.log(option);
            
            listDate.interactive.action.sections[0].rows.push(option)
        }
    }
    console.log(listDate.interactive.action.sections[0]);
    
    return listDate
}

export const placeModels = (num: number) => {
    let listPlace: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Eliga Lugar donde quiere realizar su turno" },
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

export const hourModel = (num: number, conversation: turnInterface, turn: "mañana" | "tarde") => {
    let hours: Array<string> = []
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
                            //Aqui iran las horas
                        ]
                    }
                ]
            }
        }
    }
    if (conversation.place === "shopping posadas") {
        if (turn === "mañana") {
            hours.push("09:00hs")
            for (let x = 10; x < 13; x++) {
                hours.push(`${x}:00hs`)
            }
        } else {
            for (let x = 12; x < 21; x++) {
                hours.push(`${x}:00hs`)
            }
        }
    } else if (conversation.place === "terminal unam") {
        if (turn === "mañana") {
            hours.push("08:30hs")
            hours.push("09:00hs")
            for (let x = 10; x < 13; x++) {
                hours.push(`${x}:00hs`)
            }
        } else {
            for (let x = 14; x < 17; x++) {
                hours.push(`${x}:00hs`)
            }

        }
    } else {
        if(turn !== "tarde"){
            hours.push("09:00hs")
            for (let x = 10; x < 13; x++) {
                hours.push(`${x}:00hs`)
            }
        } else {
            for (let x = 13; x < 21; x++) {
                hours.push(`${x}:00hs`)
            }
        }
    }

    hours.map((hour, index) => {
        listHours.interactive.action.sections[0].rows.push({ "id": `${index}`, "title": hour, "description": turn })
    })
    return listHours
}