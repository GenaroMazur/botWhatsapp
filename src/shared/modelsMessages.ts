
const welcomeMessage = "*¡Bienvenido a Servicios Urbanos S.A!*\n\nPara sacar turno para reclamos ingresar los siguientes datos.\n Ingresar su numero de documento sin puntos ni comas; Por ejemplo: 44736152\n\nPor favor para otros tipos de consultas comunicarse al 0810-444-7823."

export const welcomeModel = (num:number) => {

    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: welcomeMessage }
    }
}