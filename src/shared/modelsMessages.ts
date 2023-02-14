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

let turnsDays:Array<string> = []
for (let x=1;x<11;x++){
    turnsDays.push(dateZoneString(dateNowTimestamp() + 60 * 60 * 24 * x, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0].slice(5))
}
export const datesModels =(num:number)=>{    
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
    
    turnsDays.forEach((day,index)=>{
        listDate.interactive.action.sections[0].rows.push({"id":index.toString(), "title":day, "description":`Mes ${day.split("-")[0]}, dia ${day.split("-")[1]}`})
    })
    
    return listDate
}