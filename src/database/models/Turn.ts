import { Schema, model } from "mongoose"

const turnsSchema = new Schema({
    turnId:{type:Schema.Types.ObjectId, "auto":true, required:true, index:true},
    hour:{type:String, required:true},
    reserved:{type:Boolean, default:false },
    cellphoneNumber:{type:String, default:""},
    document:{type:String, default:""},
    fullName:{type:String, default:""},
    assist:{type:Boolean, default:false},
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