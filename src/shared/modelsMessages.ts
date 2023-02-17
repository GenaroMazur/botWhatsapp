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

export const datesModels = (num: number) => {
    const config:Array<configInterface> = server.app.locals.config
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

export const placeModels = async (num: number) => {
    const config:Array<configInterface> = server.app.locals.config
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
    // config.forEach(place=>{
    //     listPlace.interactive.action.sections[0].rows.push({"id":place.place, "title":place.place, "description":place.description})
    // })

    let places:Array<any> = await Turn.find().select({
        "turns":0
    })
    console.log(places);
    
    places = places.reduce((acumulador:Array<any>, turnoActual:any)=>{
            console.log(acumulador);
            
            if(!acumulador.includes(turnoActual.place)){
                acumulador.push(turnoActual.place)
            }
            return acumulador
    },[])
    places.forEach((place:string) => {
        listPlace.interactive.action.sections[0].rows.push({"id":place,"title":place,"description":""})
    });
    console.log(places);
    
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

export const hourModel = (num: number, conversation: conversationInterface, turn: "mañana" | "tarde") => {
    const config:Array<configInterface> = server.app.locals.config
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
    let hours:Array<{ "id":string, "title":string, "description":string }> = []
    const place = config.find(place=>place.place===conversation.place)
    
    const numDay = (new Date(`${new Date().getFullYear()}-${conversation.date}`).getDay())
    
    const turnPlace = place?.days[numDay].turn[0][turn]
    
    const openHour = parseInt(turnPlace?.open.split(":")[0]||"0")
    const closeHour = parseInt(turnPlace?.close.split(":")[0]||"0")
    
    for(let x = openHour; x<closeHour; x++){
        if( x===openHour && turnPlace?.open.split(":")[1]!=="00"){
            hours.push({"id":`${x}`, "title":`${openHour}:${turnPlace?.open.split(":")[1]}hs`, "description":`turno ${turn}`})
        } else {
            for(let y = 0; y <= 4; y=y+2){
                hours.push({"id":`${x}:${y}0hs`, "title":`${x}:${y}0hs`, "description":`turno ${turn}`})
            }
        }
    }

    hours.length>=10?hours.length=10:""
    listHours.interactive.action.sections[0].rows=hours
    
    return listHours
}