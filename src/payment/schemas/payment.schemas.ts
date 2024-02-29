import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Store } from "src/store/schemas/store.schemas";

export enum Status{
    PROCESSING ='Processing',
    SUCCESS = 'Success',
    FAILED = 'Failed'
}

@Schema({
    timestamps:true
})
export class Payment{
    @Prop()
    p_customer:string;

    @Prop()
    p_amount:number;

    @Prop({type:SchemaTypes.ObjectId,ref:Store.name})
    p_storeid:Types.ObjectId

    @Prop()
    p_status:Status

    @Prop({ default: generateReferenceId })
    p_referenceid: string;

    @Prop()
    currency:string
}   

let referenceCounter = 0;

function generateReferenceId() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toISOString().slice(0, 10).replace(/-/g, '')}`;
    return `${formattedDate}${String(referenceCounter++).padStart(4, '0')}`;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
