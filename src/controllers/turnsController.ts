import { NextFunction, Request, Response } from "express";
import { Turn } from "../database/models/Turn";
import { catchAsync } from "../helpers/catchAsync";
import { endpointResponse } from "../helpers/succes";


export const turnsList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const turns = await Turn.find({"turns.reserved":true})
        endpointResponse({res, code:200, message:"Lista de turnos", "body":turns})
    } catch (error:any) {
        console.log(error);
        return endpointResponse({res, code:500, message:"OPSS"})
    }
})

export const createTurns = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error:any) {
        console.log(error);
        return endpointResponse({res, code:500, message:"OPSS"})
    }
})

export const turnDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error:any) {
        console.log(error);
        return endpointResponse({res, code:500, message:"OPSS"})
    }
})

export const updateTurn = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error:any) {
        console.log(error);
        return endpointResponse({res, code:500, message:"OPSS"})
    }
})

export const deleteTurn = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error:any) {
        console.log(error);
        return endpointResponse({res, code:500, message:"OPSS"})
    }
})