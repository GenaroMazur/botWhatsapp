import { list, turnInterface } from "../interfaces/interfaces"
import { dateZoneString, dateNowTimestamp } from "../helpers/helper"
import { SERVER } from "../server"
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

export const datesModels = (num: number) => {
    const config = server.app.locals.config
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
    
    for(let x = 1; x<10; x++){
        const date = dateZoneString(dateNowTimestamp() + 60 * 60 * 24 * x, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
        const day = (new Date(date).getDay())
        if(day!==0){
            const option = { "id":`${x}`, "title": date.slice(5), "description": `dia ${config[0].days[day].day} ${date.slice(8)}` }
            listDate.interactive.action.sections[0].rows.push(option)
        }
    }
    return listDate
}

export const placeModels = (num: number) => {
    const config = server.app.locals.config
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
    config.forEach((place:any)=>{
        listPlace.interactive.action.sections[0].rows.push({"id":place.place, "title":place.place, "description":place.description})
    })
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
    

    
    return listHours
}