import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.to';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService : JwtService
    ){}
    async signUp(signUpDto:SignUpDto):Promise<{token:string}> {
        const {c_name,c_email,c_password}=signUpDto
        
        const hashedPassword = await bcrypt.hash(c_password,10)
        
        const user = await this.userModel.create({
            c_name,
            c_email,
            c_password:hashedPassword
        })
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        return {token}
        
    }   
    async login(loginDto:LoginDto):Promise<{token:string}>{
        const {c_email,c_password}=loginDto;

        const user =await this.userModel.findOne({c_email})

        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }
        const isPasswordMatched = await bcrypt.compare(c_password,user.c_password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid password')
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:`${process.env.JWT_EXPIRES}`})        
        return {token};
    }
}
