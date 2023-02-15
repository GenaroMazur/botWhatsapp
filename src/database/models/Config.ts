import { Schema, model } from "mongoose";

const turnInfoModel = new Schema({
    "boxxes":{type:String, required:true},
    "open":{type:String, required:true},
    "close":{type:String, required:true}
})

const turnModel = new Schema({
    "mañana":{type:turnInfoModel, required:true},
    "tarde":{type:turnInfoModel, required:true}
})

const daysModel = new Schema({
    day:{type:String, required:true},
    turn:{type:[turnModel], required:true}
})


const configSchema = new Schema({
    _id:{type:Schema.Types.ObjectId},
    place:{type:String, required:true},
    days:{type:[daysModel], required:true},
    description:{type:String, required:true}
},{
    collection:"BOT_Config",
    versionKey:false
})

export const ConfigBot = model("ConfigBot", configSchema)

