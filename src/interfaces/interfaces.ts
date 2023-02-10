export interface buttons {
    "messaging_product": "whatsapp",
    "to": string,
    "type": "interactive",
    "interactive": {
        "type": "button",
        "tittle"?: {
            "type": "text" | "image" | "video" | "document"
            "text": string
            "image"?: {
                "link": string,
                "provider": {
                    "name": string
                }
            }
            "video"?: {
                "link": string,
                "provider": {
                    "name": string
                }
            }
            "document"?: {
                "id": string,
                "filename": string
            }
        }
        "body": { "text": string },
        "footer"?: { "text": string }
        "action": {
            "buttons": [button]
        }
    }
}

export interface button {

    "type": "reply",
    "reply": {
        "id": string,
        "title": string
    }
}

export interface comunMessage {
    "messaging_product": "whatsapp",
    "to": string,
    "type": "text",
    "text": {
        "body": string
    }
}


const header = "¡Bienvenido a Servicios Urbanos S.A!\n\n"
const texto = "Para obtener un turno para tramitar el BEEG debe enviar los siguientes datos:\n1) Nombre y apellido.\n2) DNI\n3) Lugar de preferencia para realizar el trámite: Posadas Plaza Shopping o Terminal UNaM.\n4) Horario aprox. disponible\n\n*Posadas Plaza Shopping*: De Lunes a Sábados de 9:00hs a 21:00hs.\n\n*Terminal UNaM*: De Lunes a Viernes de 08:30hs a 13:00hs / 14:00hs a 17:30hs. Sábados de 08:00hs a 12:00hs.\n"
const footer = "Por favor para otros tipos de consultas comunicarse al 0810-444-7823."


export interface sendToWhastapp {

    method: "POST",
    headers: {
        authorization: string,
        "Content-Type": "application/json"
    },
    body: string

}