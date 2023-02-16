import NodePersist from "node-persist";
import { Turn } from "../database/models/Turn";
import { creationForm, turnDayInterface, turnInterface } from "../interfaces/interfaces";
const daysOfWeek: Array<("domingo" | "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado")> = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const generateTurns = async (creation: creationForm) => {
    const daysDiff = ( new Date(creation.dateEnd).getTime() - new Date(creation.dateStart).getTime()) / (1000 * 60 * 60 * 24)
    
    const openHourMorning = parseInt(creation.morning.start.substring(0, 2))
    const closeHourMorning = parseInt(creation.morning.end.substring(0, 2))
    const openMinutesMorning = creation.morning.start.substring(3, 5)

    const openHourEvening = parseInt(creation.evening.start.substring(0, 2))
    const closeHourEvening = parseInt(creation.evening.end.substring(0, 2))
    const openMinutesEvening = creation.evening.start.substring(3, 5)
    console.log("inicializar horas");
    
    let turn: turnInterface = {
        "cellphoneNumber": "",
        "document": "",
        "fullName": "",
        "hour": "",
        "turn": "mañana",
        "reserved": false
    }
    const morningBoxxes = creation.morning.boxxes
    const eveningBoxxes = creation.evening.boxxes
    let date = new Date(creation.dateStart)
    await NodePersist.setItem("openTurns", [])
    
    console.log("crear archivo persistente");
    
    for (let x = 1; x <= daysDiff; x++) {
        let openTurns: Array<turnInterface> = []
        
        
        if (creation.daysOfWeek.includes(daysOfWeek[date.getDay()])) {
            
            turn.turn = "mañana"
            turn.hour = `${openHourMorning}:${openMinutesMorning}hs`
            openTurns.push(turn)
            console.log(turn);
            
            for (let y = openHourMorning; y < closeHourMorning; y++) {
                let minutes = y === openHourMorning ? parseInt(turn.hour.substring(3, 5)) : 0

                while (minutes < 60 && minutes + 6 - morningBoxxes < 60) {
                    
                    minutes += (6 - morningBoxxes)
                    turn.hour = `${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`
                    console.log(turn);
                    openTurns.push(turn)
                }
                console.log(openTurns);
                
            }


            turn.turn = "tarde"
            turn.hour = `${openHourEvening}:${openMinutesEvening}hs`
            openTurns.push(turn)
            
            for (let y = openHourEvening; y < closeHourEvening; y++) {
                console.log("bucle hora tarde num:",x);
                let minutes = y === openHourEvening ? parseInt(turn.hour.substring(3, 5)) : 0

                while (minutes < 60 || minutes + 6 - eveningBoxxes < 60) {
                    minutes += (6 - eveningBoxxes)
                    turn.hour = `${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`
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