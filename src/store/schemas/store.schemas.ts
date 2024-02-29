import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { User } from "src/auth/schemas/user.schemas";

export enum Category{
  SPORTS = 'Sports',
  ELECTRONICS = 'Electronics',
  CARS = 'Cars',
  DRESSES = 'Dress'   
}

@Schema({
    timestamps:true
})
export class Store{

    @Prop()
    s_name:string;

    @Prop()
    s_location:string;

    @Prop()
    s_category:Category;

    @Prop()
    s_contactno:number;

    @Prop()
    s_cashbackpercentage : number;

    @Prop()
    s_openingtime:Date;

    @Prop()
    s_closingtime:Date;

    @Prop()
    s_dialcode:number;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    s_createdBy: Types.ObjectId;
}

export const StoreSchema = SchemaFactory.createForClass(Store)
