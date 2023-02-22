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
            // if(new Date(value)=="Invalid Date") throw new Error("")
            return true
        })
]