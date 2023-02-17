import { buttons, configInterface, conversationInterface, list, turnInterface } from "../interfaces/interfaces"
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

export const turnReady = async (num: number, conversation: conversationInterface, hourRange:Array<string>) => {

    const turns:any = (await Turn.find({"date":conversation.date, "place":conversation.place}).select({turns:{$elemMatch:{hour:new RegExp(`^${hourRange[0].split(":")[0]}`,"i")}}}))[0]?.turns
    const message = `*Su turno fue asignado el día *${conversation.date}* a las *${turns[0].hour}*.en *${conversation.place}* 

    ⚠️Recuerde que para realizar el trámite debe contar con la siguiente documentación obligatoria:
    1) Constancia de Inscripción BEEG 2022. (Firmado y Sellado por la institución escolar y policial). Obtenida del sitio oficial https://beg.misiones.gov.ar/#/home
    2) DNI original y copia.
    3) Tarjeta sube.
    
    Para mejorar la experiencia del trámite, nos permitimos hacerle algunas recomendaciones:
    •Sea puntual en el cumplimiento del horario del turno agendado. (NO PRESENTARSE ANTES DE SU TURNO).
    •Tener la documentación a mano. 
    •Asistir SOLO, en la medida de sus posibilidades o con el Beneficiario en caso de no tener tarjeta Sube. 
    
        
    ¡Muchas gracias y que tenga un excelente día!`

    let turnReady: buttons = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "button",
            "body": { "text": message },
            "action": {
                "buttons":[
                    {
                        "type":"reply",
                        "reply":{
                            "id":`si-${turns[0].hour}`,
                            "title":"si"
                        }
                    },
                    {
                        "type":"reply",
                        "reply":{
                            "id":"no-",
                            "title":"no"
                        }
                    }
                ]
            }
        }
    }
    return turnReady
}

export const hourRangeModel = async (num: number, conversation: conversationInterface, turn: "mañana" | "tarde") => {
    let listHours: list = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Elija a que rango horario quiere realizar su turno" },
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
    let hoursRange: Array<{ "id": string, "title": string, "description": string }> = []
    let turnos:any = (await Turn.findOne({place:conversation.place, date:conversation.date}).select({place:0, day:0, date:0}))?.turns

    turnos= turnos?.reduce((initial:Array<string>, turno:any):Array<String>=>{
        if(turno.turn===turn){
            if(initial[initial.length-1] !== undefined){
                if(initial[initial.length-1] !== `${turno.hour.split(":")[0]}:00hs`){
                    initial.push(`${turno.hour.split(":")[0]}:00hs`)
                }
            } else {
                initial.push(`${turno.hour.split(":")[0]}:00hs`)
            }
        }
        return initial
    },[])
    hoursRange = turnos.map((turno:string, index:number)=>{
        if(turnos[index+1]!==undefined){
            return {"id":`rango:${turno}-${turnos[index+1]}`,"title":`${turno}-${turnos[index+1]}`,"description":turn}
        } else {
            return {"id":`rango:${turno}-${turnos[index+1]}`,"title":`${turno}-${`${parseInt(turno.split(":")[0])+1}:00hs`}`,"description":turn}
        }
    })
    console.log(hoursRange);
    
    listHours.interactive.action.sections[0].rows = hoursRange

    return listHours
}

