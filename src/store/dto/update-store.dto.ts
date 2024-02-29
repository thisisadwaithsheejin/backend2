import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { Category } from '../schemas/store.schemas'
import { Types } from 'mongoose'

export class updateStoreDto{

    @IsNotEmpty()
    @IsString()
    readonly s_name:string

    @IsNotEmpty()
    @IsString()
    readonly s_location:string

    @IsNotEmpty()
    @IsNumber()
    readonly s_contactno:number

    @IsNotEmpty()
    @IsNumber()
    readonly s_cashbackpercentage:number

    @IsNotEmpty()
    @IsString()
    readonly s_openingtime:Date

    @IsNotEmpty()
    @IsString()
    readonly s_closingtime:Date

    @IsNotEmpty()
    @IsString()
    readonly s_dialcode:number

    @IsNotEmpty()
    @IsString()
    readonly s_createdBy:Types.ObjectId
    
    readonly s_category:Category
}