import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { Status } from "../schemas/payment.schemas";

export class updatePaymentDto{
    @IsNotEmpty()
    @IsString()
    readonly p_customer:string;

    @IsNotEmpty()
    @IsString()
    readonly p_amount: number;

    readonly p_referenceid:string;
    
    @IsEnum(Status)
    readonly p_status:Status;

    @IsString()
    readonly currency:string;
    
    @IsMongoId()
    readonly p_storeid : Types.ObjectId;

}