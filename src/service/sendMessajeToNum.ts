import fetch from "cross-fetch";
import { sendToWhastapp } from "../interfaces/interfaces";

require("dotenv").config()
const token = process.env.TOKEN || ""

export const sendToNum = async (message:string, num:string)=>{
    const options:sendToWhastapp = {
        "headers":{
            "authorization":token,
            "Content-Type":"application/json"
        },
        "method":"POST",
        "body":message
    }
    fetch("https://graph.facebook.com/v15.0/109330648741829/messages",options)
}