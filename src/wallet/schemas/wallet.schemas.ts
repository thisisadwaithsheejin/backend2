import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { User } from "src/auth/schemas/user.schemas";

@Schema({
    timestamps:true
})

export class Wallet{

    @Prop({default:0})
    oldValue:number;

    @Prop({default:0})
    newValue : number;
    
    @Prop({default:0})
    total:number;

    @Prop({type:SchemaTypes.ObjectId,ref:User.name})
    customer:Types.ObjectId;

    @Prop({default:0})
    bonus:number;

}
export const WalletSchema = SchemaFactory.createForClass(Wallet) 
