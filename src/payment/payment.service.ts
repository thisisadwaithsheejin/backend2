import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './schemas/payment.schemas';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class PaymentService {
    
    constructor(
        @InjectModel(Payment.name)
        private paymentModel: mongoose.Model<Payment>,
        private readonly walletService:WalletService,
    ){}
    async findAll(): Promise<Payment[]>{
        const payments = await this.paymentModel.find().populate("p_customer")
        return payments;   
    }

    async create(payment:Payment): Promise<Payment>{
        const res = await this.paymentModel.create(payment)
        await this.walletService.updateWalletAndGiveBonus(payment.p_customer, payment.p_amount);
        return res;
    }

    async findById(id:string):Promise<Payment>{
        const cid = await this.paymentModel.findById(id)
        if(!cid){
            throw new NotFoundException('Payment not found')
        }   
        return cid
    }
 
    async updateById(id:string,cid:Payment):Promise<Payment>{
        return await this.paymentModel.findByIdAndUpdate(id,cid,{
            new :true ,
            runValidators: true
        });
    }
    
    async deleteById(id:string):Promise<Payment>{
        return await this.paymentModel.findByIdAndDelete(id);
        }

}