import { Router } from "express";
import { createTurns, deleteTurn, turnDetail, turnsList, updateTurn } from "../controllers/turnsController";
import { createTurnChain } from "../middlewares/turnsChainMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()


router.route("/")
    .get(turnsList)
    .post(createTurnChain, validationHandlerMiddleware, createTurns)
router.route("/:turnId")
    .get(turnDetail)
    .put(updateTurn)
    .delete(deleteTurn)

export default router