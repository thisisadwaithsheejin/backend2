import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})

export class Wallet{
    
    @Prop({default:0})
    balance:number;

    @Prop()
    customer:string;

}

export const WalletSchema = SchemaFactory.createForClass(Wallet)

