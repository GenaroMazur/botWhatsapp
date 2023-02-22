import { body } from "express-validator"

export const createTurnChain = [
    body("place")
        .notEmpty().withMessage("El campo 'place' no puede estar vacio"),
    body("daysOfWeek")
        .notEmpty().withMessage("El campo 'daysOfWeek' no puede estar vacio").bail()
        .isArray({"min":1}).withMessage("El campo 'daysOfWeek' debe ser un array de dias con al menos un dia").bail()
        .custom((value:Array<string>,{req})=>{
            const daysOfWeek = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]
            if(!value.every(day=>daysOfWeek.includes(day))){
                throw new Error(`Elemento en array invalido, valores disponibles:'${daysOfWeek.join("', '")}'`)
            } else {
                return true
            }
        }),
    body("dateStart")
        .notEmpty().withMessage("El campo 'dateStart' no puede estar vacio").bail()
        .custom((value:string, {req})=>{
            const date= value.split("-")
            if(date.length!==3 || date[0],length!==4 || date[1],length!==2 || date[2],length!==2) throw new Error("Formato de fecha invalido (YYYY-MM-DD)")
            if(Number.isNaN(new Date(value).getDay())) throw new Error("Formato de fecha invalida")
            return true
        }),
    body("dateEnd")
        .notEmpty().withMessage("El campo 'dateEnd' no puede estar vacio").bail()
        .custom((value:string, {req})=>{
            const date= value.split("-")
            if(date.length!==3 || date[0],length!==4 || date[1],length!==2 || date[2],length!==2) throw new Error("Formato de fecha invalido (YYYY-MM-DD)")
            if(Number.isNaN(new Date(value).getDay())) throw new Error("Formato de fecha invalida")
            return true
        }),
    body("morning")
        .notEmpty().withMessage("El campo 'morning' no puede estar vacio").bail()
        .isObject().withMessage("El campo 'morning' debe ser un objeto").bail()
        .custom((value, {req})=>{
            const boxxes = value.boxxes
            const start:string = value.start
            const end:string = value.end
            if(boxxes === undefined || start === undefined || end === undefined) throw new Error("El campo 'morning' debe tener los valores 'boxxes'(number), start('HH:MMhs'), end('HH:MMhs')")
            if(typeof boxxes !== "number") throw new Error("El campo 'boxxes' en 'morning' debe ser un numero")
            if(typeof start !== "string" || typeof end !== "string") throw new Error("El campo 'start' y 'end' dentro de 'morning' deben ser strings con el formato 'HH:MMhs'")
            const startHour = start.split(":")
            const endHour = end.split(":")
            if(startHour.length !== 2 || endHour.length !== 2 || startHour[0].length !== 2 || startHour[1].length !== 4 || endHour[0].length !== 2 || endHour[1].length !== 4) throw new Error("formato de hora invalido en 'start' o 'end' de 'morning'")
            return true
        }),
    body("evening")
        .notEmpty().withMessage("El campo 'evening' no puede estar vacio").bail()
        .isObject().withMessage("El campo 'evening' debe ser un objeto").bail()
        .custom((value, {req})=>{
            const boxxes = value.boxxes
            const start:string = value.start
            const end:string = value.end
            if(boxxes === undefined || start === undefined || end === undefined) throw new Error("El campo 'evening' debe tener los valores 'boxxes'(number), start('HH:MMhs'), end('HH:MMhs')")
            if(typeof boxxes !== "number") throw new Error("El campo 'boxxes' en 'evening' debe ser un numero")
            if(typeof start !== "string" || typeof end !== "string") throw new Error("El campo 'start' y 'end' dentro de 'evening' deben ser strings con el formato 'HH:MMhs'")
            const startHour = start.split(":")
            const endHour = end.split(":")
            if(startHour.length !== 2 || endHour.length !== 2 || startHour[0].length !== 2 || startHour[1].length !== 4 || endHour[0].length !== 2 || endHour[1].length !== 4) throw new Error("formato de hora invalido en 'start' o 'end' de 'evening'")
            return true
        })
]