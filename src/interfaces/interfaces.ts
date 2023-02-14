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

export interface list {
    "messaging_product": "whatsapp",
    "to": string,
    "type": "interactive",
    "interactive": {
        "type":"list",
        "tittle"?:{
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
        },
        "body":{"text":string},
        "footer"?:{"text":string},
        "action":{
            "button":"Fechas Disponibles",
            "sections":[sectionsInList]
        }
    }
}

export interface sectionsInList {
    "title":string,
    "rows":[{
        "id":string,
        "title":string,
        "description":string
    }]
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


export interface turnInterface{
    fullName:string | null,
    document:string,
    date:string,
    hour:string,
    place:""|"UNAM"|"SHOPPING"|"OBERA"
} 


export interface sendToWhastapp {

    method: "POST",
    headers: {
        authorization: string,
        "Content-Type": "application/json"
    },
    body: string

}