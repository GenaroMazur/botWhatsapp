import NodePersist from "node-persist";
import { Turn } from "../database/models/Turn";
import { creationForm, turnDayInterface, turnInterface } from "../interfaces/interfaces";
const daysOfWeek: Array<("domingo" | "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado")> = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const generateTurns = async (creation: creationForm) => {
    const daysDiff = ( new Date(creation.dateEnd).getTime() - new Date(creation.dateStart).getTime()) / (1000 * 60 * 60 * 24)
    
    const openHourMorning = parseInt(creation.morning.start.split(":")[0])
    const closeHourMorning = parseInt(creation.morning.end.split(":")[0])
    const openMinutesMorning = creation.morning.start.split(":")[1].substring(0, 2)

    const openHourEvening = parseInt(creation.evening.start.split(":")[0])
    const closeHourEvening = parseInt(creation.evening.end.split(":")[0])
    const openMinutesEvening = creation.evening.start.split(":")[1].substring(0, 2)
    console.log("inicializar horas");
    
    class turnClass {
        public cellphoneNumber:string
        public document:string
        public fullName:string
        public hour:string
        public turn:"mañana"|"tarde"
        public reserved:boolean
        constructor(hour:string, turn:"mañana"|"tarde"){
            this.cellphoneNumber="",
            this.document= "",
            this.fullName= "",
            this.hour= hour,
            this.turn= turn,
            this.reserved= false
        }
    }
    const morningBoxxes = creation.morning.boxxes
    const eveningBoxxes = creation.evening.boxxes
    let date = new Date(creation.dateStart)
    await NodePersist.setItem("openTurns", [])
    
    console.log("crear archivo persistente");
    
    for (let x = 1; x <= daysDiff; x++) {
        let openTurns: Array<turnInterface> = []
        
        
        if (creation.daysOfWeek.includes(daysOfWeek[date.getDay()])) {

            let turn = new turnClass(`${openHourMorning}:${openMinutesMorning}hs`,"mañana")
            openTurns.push(turn)
            
            for (let y = openHourMorning; y < closeHourMorning; y++) {
                let minutes = y === openHourMorning ? parseInt(turn.hour.substring(3, 5)) : 0

                while (minutes < 60 && minutes + 6 - morningBoxxes < 60) {
                    
                    minutes += (6 - morningBoxxes)
                    let turn = new turnClass(`${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`,"mañana")
                    openTurns.push(turn)
                }
                
            }

            turn = new turnClass(`${openHourEvening}:${openMinutesEvening}hs`,"tarde")
            openTurns.push(turn)
            
            for (let y = openHourEvening; y < closeHourEvening; y++) {
                let minutes = y === openHourEvening ? parseInt(turn.hour.substring(3, 5)) : 0

                while (minutes < 60 || minutes + 6 - eveningBoxxes < 60) {
                    minutes += (6 - eveningBoxxes)
                    turn = new turnClass(`${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`,"tarde")
                    openTurns.push(turn)
                }
            }
            const dayTurn = {
                "date": `${date.getFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`,
                "place": creation.place,
                "turns": openTurns,
                "day": daysOfWeek[date.getDay()]
            }
            
            await NodePersist.updateItem("openTurns", [... await NodePersist.getItem("openTurns"), dayTurn])
        }
        date.setDate(date.getDate() + 1)
    }
    Turn.insertMany(await NodePersist.getItem("openTurns"))
    console.log("turnos creados !");
}