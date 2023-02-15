import express from "express"
import {Server} from "http"
import cors from "cors"
import nodePersist from "node-persist"
import { mongoosedb } from "./database/mongoose"
import { ConfigBot } from "./database/models/Config"

require("dotenv").config()

export class SERVER {
    
    private http:Server | undefined
    public app:express.Application
    private static _instance: SERVER

    public static get instance() { return this._instance || (this._instance = new this()) }

    constructor() {
        this.app = express()
        this.app.locals.users=[]
    }

    public init(): SERVER { return new SERVER() }
    public async start():Promise<void|unknown> {
        try {
            const port = process.env.PORT
            const urlDb = process.env.URLDB
            if (port === undefined || urlDb === undefined ) throw new Error("-------------- Faltan variables de entorno --------------")

            this.http = this.app.listen(port, () => {
                console.log(`=============== Servidor en \x1b[32mlinea\x1b[0m Puerto ${port} ===============`);
            })
            
            this.app.use(express.json())
            this.app.use(express.urlencoded({ extended: true }))
            this.app.use(cors())
            this.app.locals.config = await ConfigBot.find()

            mongoosedb(urlDb)
            await nodePersist.init({
                "dir":__dirname+"./../conversations",
                "expiredInterval":60000*60*2,
                "stringify":JSON.stringify,
                "parse":JSON.parse
            })
        } catch (error) {
            return error
        }
    }

    public close():void{
        this.http?.close()
    }
}