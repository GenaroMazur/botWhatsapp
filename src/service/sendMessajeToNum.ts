import fetch from "cross-fetch";
import { sendToWhastapp } from "../interfaces/interfaces";

require("dotenv").config()
const token = process.env.TOKEN || ""

export const sendToUser = async (message:string)=>{
    const options:sendToWhastapp = {
        "headers":{
            "authorization":token,
            "Content-Type":"application/json"
        },
        "method":"POST",
        "body":message
    }
    fetch("https://graph.facebook.com/v16.0/109330648741829/messages",options).then(r=>console.log(r))
}