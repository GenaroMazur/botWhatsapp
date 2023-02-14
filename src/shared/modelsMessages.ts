import { list } from "../interfaces/interfaces"

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

export const datesModels = (num:number)=>{
    const listDate:list = {
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
                            {
                                "id":"001",
                                "title":"03-01",
                                "description":"fehca tanto"
                            }
                        ]
                    }
                ]
            }
        }
    }

    return listDate
}