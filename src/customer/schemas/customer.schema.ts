import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class Customer{

    @Prop()
    c_name:string;

    @Prop()
    c_email:string;

    @Prop()
    c_password:string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)