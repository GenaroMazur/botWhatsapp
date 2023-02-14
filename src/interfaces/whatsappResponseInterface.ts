export interface whastappObjectResponse {
    object:"whatsapp_business_account",
    entry:[{
        id:string,
        changes:[{
            value:{
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": string,
                    "phone_number_id": string
                },
                contacts:[contactInterface]
                messages:[messageInMessagesInterface],
                statuses:[statusesInterface],
                errors?:[errorInterface]
            },
            field:string
        }]
    }]
}

    export interface contactInterface{
        profile:{"name":string},
        wa_id:string
    }

    export interface messageInMessagesInterface{
        context?:contextInMessageInterface,
        from:string,
        id:string,
        identity?:identityInMessageInterface,
        timestamp:string,
        type:"audio"|"contacts"|"document"|"image"|"location"|"text"|"unknown"|"video"|"voice"|"button",
        audio?:{id:string,mime_type:string}, 
        contacts?:contactInterface, 
        document?:mediaInMessage, 
        image?:mediaInMessage, 
        location?:locationInMessage, 
        system?:{body:string}, 
        video?:mediaInMessage,
        sticker?:stickerInMessageInterface
        voice?:mediaInMessage,
        text?:{body:string},
        interactive?:interactiveInMessage,
        referral?:referralInMessage,
        button?:{payload:string, text:string},
        order:orderInMessageInterface
    }

        export interface stickerInMessageInterface{
            id:string,
            mime_type:string,
            sha256:string,
            animated:boolean
        }

        export interface orderInMessageInterface{
            catalog_id:string,
            text:string,
            product_items:[{
                product_retailer_id:string,
                quantity:string,
                item_price:string,
                currency:string
            }]
        }

        export interface contextInMessageInterface{
            forwarded:boolean,
            frequently_forwarded:boolean,
            from:string,
            id:string,
            referred_product?:{
                catalog_id:string,
                product_retailer_id:string
            }
        }

        export interface identityInMessageInterface{
            acknowledged:string,
            created_timestamp:number,
            hash:string
        }
        
        export interface mediaInMessage {
            caption:string,
            filename:string,
            id:string,
            mime_type:string,
            sha256:string
        }

        export interface contactsInMessage{
            addresses:string,
            birthday:string,
            emails?:[{email:string, type:string}],
            ims?:[{service:string,user_id:string}],
            name?:[{first_name:string, middle_name:string, last_name:string, formatted_name:string, "name-prefix":string, "name_suffix":string, type:string}],
            org?:[{company:string, department:string, type:string}],
            phones?:[{phone:string, wa_id:string, type:string}],
            urls?:[{url:string, type:string}]
        }

        export interface locationInMessage{
            latitude:string,
            longitude:string,
            address:string,
            name:string,
            url:string
        }

        export interface interactiveInMessage{
            type:"list_reply"|"button_reply"
            list_reply?:{id:string, description:string, tittle:string},
            button_reply?:{id:string, tittle:string}
        }

        export interface referralInMessage{
            headline:string,
            body:string,
            source_type:string,
            source_id:string,
            source_url:string,
            media_type:string,
            image_url:string,
            video_url:string,
            thumbnail_url:string
        }



    


export interface statusesInterface{
    id:string,
    recipient_id:string,
    status:"delivered"|"read"|"sent",
    timestamp:string,
    conversation:conversationInStatus,
    pricing:pricingInStatus,
    errors?:errorInterface
}
    
    export interface conversationInStatus{
        id:string,
        origin:{type:"business_initiated"|"user_initiated"|"referral_conversion"},
    }

    export interface pricingInStatus {
        pricing_model:"CBP"|"NBP",
        category:"business_initiated"|"user_initiated"|"referral_conversion"
    }

export interface errorInterface{
    code:number,
    tittle:string,
    message:String,
    error_data:{detail:string}
}