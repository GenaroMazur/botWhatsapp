import { Schema, model } from "mongoose"

const turnsSchema = new Schema({
    hour:{type:String, required:true},
    reserved:{type:Boolean, default:false },
    cellphoneNumber:{type:String, default:""},
    document:{type:String, default:""},
    fullName:{type:String, default:""},
    turn:{type:String}
})

const turnoSchema = new Schema({
    date:{type:String,required:true},
    day:{type:String,required:true},
    place:{type:String,required:true},
    turns:{type:[turnsSchema],required:true}
},{
    "collection":"BOT_Turn",
    "versionKey":false
})

export const Turn = model("Turn",turnoSchema)