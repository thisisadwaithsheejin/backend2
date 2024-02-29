import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocument = User&Document;
@Schema({
    timestamps:true
})

export class User {

    @Prop()
    c_name:string

    @Prop()
    c_email:string

    @Prop() 
    c_password:string
    
    @Prop()
    userName:string
}

export const UserSchema = SchemaFactory.createForClass(User)