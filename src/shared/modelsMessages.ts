import { Turn } from "../database/models/Turnos"
import { list } from "../interfaces/interfaces"
import { dateZoneString, dateNowTimestamp } from "../helpers/helper"

const welcomeMessage = "*¡Bienvenido a Servicios Urbanos S.A!*\n\nPara sacar turno para reclamos ingresar los siguientes datos.\nSu nombre y apellido completos. \n\nPor favor para otros tipos de consultas comunicarse al 0810-444-7823."
const dniMessage = "Ahora Debe ingresar su numero de documento *sin puntos ni comas*.\n Por ejemplo: 44736152"

export const welcomeModel = (num:number) => {

    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: welcomeMessage }
    }
}

export const dniModel = (num:number)=>{
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: dniMessage }
    }
}

export const datesModels = async (num:number)=>{
    let query: any = {
        "$gte": dateZoneString(dateNowTimestamp(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0],
        "$lte": dateZoneString(dateNowTimestamp() + 60 * 60 * 24 * 15, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
    }
    console.log(query);
    
    let listDate:list = {
        "messaging_product":"whatsapp",
        "type":"interactive",
        "to":num.toString(),
        "interactive":{
            "type":"list",
            "body":{"text":"Eliga la fecha la cual quiera reservar su turno"},
            "action":{
                "button":"Fechas Disponibles",
                "sections":[
                    {
                        "title":"",
                        "rows":[
                            ///AQUI VAN LAS FECHAS
                        ]
                    }
                ]
            }
        }
    }
    const turns = await Turn.find({
        "reserved":false,
        "day":query
    }).select({
        "day":1
    })

    turns.forEach((turn,index)=>{
        listDate.interactive.action.sections[0].rows.push({"id":index.toString(), "title":turn.day, "description":"disponible"})
    })
    console.log(listDate.interactive.action.sections[0].rows);
    
    return listDate
}