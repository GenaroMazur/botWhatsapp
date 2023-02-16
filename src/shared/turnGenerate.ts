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
    console.log(daysDiff);
    
    for (let x = 1; x <= daysDiff; x++) {
        console.log("bucle dia num:",x);
        
        let openTurns: Array<turnInterface> = []
        console.log(new Date().getFullYear(),creation.dateStart);
        
        console.log(date)
        console.log(date.getDay());
        
        if (creation.daysOfWeek.includes(daysOfWeek[date.getDay()])) {
            
            turn.turn = "mañana"
            turn.hour = `${openHourMorning}:${openMinutesMorning}hs`
            openTurns.push(turn)
            
            for (let y = openHourMorning; y < closeHourMorning; y++) {
                console.log("bucle hora",y,"mañana num:",x);
                let minutes = y === openHourMorning ? parseInt(turn.hour.substring(3, 5)) : 0

                while (minutes < 60 && minutes + 6 - morningBoxxes < 60) {
                    console.log("bucle hora",y,"mañana, minuto",minutes);
                    
                    minutes += (6 - morningBoxxes)
                    turn.hour = `${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`
                    openTurns.push(turn)
                }
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
    Turn.bulkSave(await NodePersist.getItem("openTurns"))
    console.log("turnos creados !");
}