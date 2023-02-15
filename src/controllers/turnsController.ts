import { NextFunction, Request, Response } from "express";
import { Turn } from "../database/models/Turn";
import { catchAsync } from "../helpers/catchAsync";
import { endpointResponse } from "../helpers/succes";
import { dateZoneString, dateNowTimestamp } from "../helpers/helper";

export const turnsList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let date: any = dateZoneString(dateNowTimestamp(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
        req.query.date !== undefined ? date = req.query.date : "";

        const turns = await Turn.aggregate([
            {
                $addFields: {
                    turns: {
                        $map: {
                            input: '$turns',
                            as: 'turn',
                            in: {
                                _id: '$$turn.hour', reserved: {
                                    "$cond": [
                                        { "$eq": ["$$turn.reserved", false] },
                                        "$$REMOVE"
                                    ]
                                }
                            },
                        }
                    }
                }
            }
        ])

        endpointResponse({ res, code: 200, message: "Lista de turnos", "body": turns })
    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const createTurns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})

export const turnDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

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

    } catch (error: any) {
        console.log(error);
        return endpointResponse({ res, code: 500, message: "OPSS" })
    }
})