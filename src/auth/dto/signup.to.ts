import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'

export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    readonly c_name:string

    @IsNotEmpty()
    @IsString()
    @IsEmail({},{message:"please enter correct email"})
    readonly c_email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly c_password : string
}