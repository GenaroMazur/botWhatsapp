import { NextFunction, Request, Response } from "express";
import { Turn } from "../database/models/Turn";
import { catchAsync } from "../helpers/catchAsync";
import { endpointResponse } from "../helpers/succes";
import { dateZoneString, dateNowTimestamp } from "../helpers/helper";
import { creationForm, turnInterface } from "../interfaces/interfaces";
import { generateTurns } from "../shared/turnGenerate";

export const turnsList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let date: any = dateZoneString(dateNowTimestamp(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
        req.query.date !== undefined ? date = req.query.date : "";

        const turns = (await Turn.findOne({ date, "turns.reserved": true }))?.turns.filter(turn => turn.reserved)

        endpointResponse({ res, code: turns ? 200 : 204, message: "Lista de turnos", "body": turns })
    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const createTurns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const creation: creationForm = {
            "place":"shopping posadas",//hay que sacar del token
            "daysOfWeek": req.body.daysOfWeek,
            "dateStart": req.body.dateStart,
            "dateEnd": req.body.dateEnd,
            "morning": {
                "boxxes": req.body.morning.boxxes,
                "start": req.body.morning.start,
                "end": req.body.morning.end
            },
            "evening": {
                "boxxes": req.body.evening.boxxes,
                "start": req.body.evening.start,
                "end": req.body.evening.end
            }
        }


        generateTurns(creation)
        endpointResponse({res,"message":"¡ Turnos generados !", code:201})
    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const turnDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const turnId = req.params.turnId
        const turn = (await Turn.find({"turns.turnId":turnId},{"turns.$":1}))[0].turns[0]
        endpointResponse({res, code:turn!==null?200:204, message:`¡ Turno !`,body:turn})
    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const updateTurn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const deleteTurn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const turnId = req.params.turnId
        const turn = await Turn.find({"turns.turnId":turnId},{"pull":{"turns":{"turnId":turnId}}})
        endpointResponse({res, code:turn!==null?200:204, message:`¡ Turno !`,body:turn})
    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})