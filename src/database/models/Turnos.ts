import { Schema, model } from "mongoose"

const turnoSchema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
            default: ""
        },
        document: {
            type: String,
            trim: true,
            default: ""
        },
        reserved: {
            type: Boolean,
            default: false
        },
        hour: {
            type: String,
            trim: true,
            default: ""
        },
        place: {
            type: String,
            default: "",
        },
        day: {
            type: String,
            trim: true,
            required:[true,"Fecha requerida"]
        },
        confirm: {
            type: Boolean,
            default: false
        }

    },
    {
        collection:"BOT_Turn",
        timestamps: true,
        versionKey: false,
    }
)

export const Turn = model("Turn",turnoSchema)