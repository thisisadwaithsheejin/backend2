import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Payment } from "src/payment/schemas/payment.schemas";

@Schema({
    timestamps:true
})

export class Wallet{
    
    @Prop({default:0})
    balance:number;

    @Prop({type:SchemaTypes.ObjectId,ref:Payment.name})
    customer:Types.ObjectId;

}
export const WalletSchema = SchemaFactory.createForClass(Wallet)