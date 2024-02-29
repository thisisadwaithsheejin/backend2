import {IsNotEmpty, IsString} from 'class-validator'

export class createCustomerDto{

    @IsNotEmpty()
    @IsString()
    readonly c_name:string

    @IsNotEmpty()
    @IsString()
    readonly c_email: string
    
    @IsNotEmpty()
    @IsString()
    readonly c_password : string
}


