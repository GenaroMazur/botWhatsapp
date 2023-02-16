"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hourModel = exports.momentModel = exports.placeModels = exports.datesModels = exports.dniModel = exports.welcomeModel = void 0;
const helper_1 = require("../helpers/helper");
const server_1 = require("../server");
const server = server_1.SERVER.instance;
const welcomeMessage = "*¡Bienvenido a Servicios Urbanos S.A!*\n\nPara sacar turno para reclamos ingresar los siguientes datos.\nSu nombre y apellido completos. \n\nPor favor para otros tipos de consultas comunicarse al 0810-444-7823.";
const dniMessage = "Ahora Debe ingresar su numero de documento *sin puntos ni comas*.\n Por ejemplo: 44736152";
const welcomeModel = (num) => {
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: welcomeMessage }
    };
};
exports.welcomeModel = welcomeModel;
const dniModel = (num) => {
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: dniMessage }
    };
};
exports.dniModel = dniModel;
const datesModels = (num) => {
    const config = server.app.locals.config;
    let listDate = {
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
                        "rows": []
                    }
                ]
            }
        }
    };
    for (let x = 1; x < 10; x++) {
        const date = (0, helper_1.dateZoneString)((0, helper_1.dateNowTimestamp)() + 60 * 60 * 24 * x, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0];
        const day = (new Date(date).getDay());
        if (day !== 0) {
            const option = { "id": `${x}`, "title": date.slice(5), "description": `dia ${config[0].days[day].day} ${date.slice(8)}` };
            listDate.interactive.action.sections[0].rows.push(option);
        }
    }
    return listDate;
};
exports.datesModels = datesModels;
const placeModels = (num) => {
    const config = server.app.locals.config;
    let listPlace = {
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
                        "rows": []
                    }
                ]
            }
        }
    };
    config.forEach(place => {
        listPlace.interactive.action.sections[0].rows.push({ "id": place.place, "title": place.place, "description": place.description });
    });
    return listPlace;
};
exports.placeModels = placeModels;
const momentModel = (num) => {
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
    };
};
exports.momentModel = momentModel;
const hourModel = (num, conversation, turn) => {
    const config = server.app.locals.config;
    let listHours = {
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
                        "rows": []
                    }
                ]
            }
        }
    };
    let hours = [];
    const place = config.find(place => place.place === conversation.place);
    const numDay = (new Date(`${new Date().getFullYear()}-${conversation.date}`).getDay());
    const turnPlace = place === null || place === void 0 ? void 0 : place.days[numDay].turn[0][turn];
    const openHour = parseInt((turnPlace === null || turnPlace === void 0 ? void 0 : turnPlace.open.split(":")[0]) || "0");
    const closeHour = parseInt((turnPlace === null || turnPlace === void 0 ? void 0 : turnPlace.close.split(":")[0]) || "0");
    for (let x = openHour; x < closeHour; x++) {
        if (x === openHour && (turnPlace === null || turnPlace === void 0 ? void 0 : turnPlace.open.split(":")[1]) !== "00") {
            hours.push({ "id": `${x}`, "title": `${openHour}:${turnPlace === null || turnPlace === void 0 ? void 0 : turnPlace.open.split(":")[1]}hs`, "description": `turno ${turn}` });
        }
        else {
            for (let y = 0; y <= 4; y = y + 2) {
                hours.push({ "id": `${x}:${y}0hs`, "title": `${x}:${y}0hs`, "description": `turno ${turn}` });
            }
        }
    }
    hours.length >= 10 ? hours.length = 10 : "";
    listHours.interactive.action.sections[0].rows = hours;
    console.log(listHours.interactive.action.sections[0]);
    return listHours;
};
exports.hourModel = hourModel;
