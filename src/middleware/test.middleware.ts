import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction,Request,Response} from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TestMiddleware implements NestMiddleware{
    constructor(private readonly jwtService : JwtService){}
    use(req:Request,res:Response,next : NextFunction){
        const token = req.headers.authorization?.split(' ')[1];
    if(token){

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            next();
        }
        catch(error){
            console.log(error)
            res.status(401).json({message:'Invalid or Expired token'});
        }
    }
    else{
        res.status(401).json({message:'No token provided'})
    }
    }
}