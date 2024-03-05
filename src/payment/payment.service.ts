import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './schemas/payment.schemas';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WalletService } from 'src/wallet/wallet.service';
import { ObjectId } from 'mongodb';
 
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
        await this.updateWalletAndBonus(payment);
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

    private async updateWalletAndBonus(payment:Payment):Promise<void>{
        const customer = payment.p_customer.toString();
        console.log('cuhh',customer);
        
        const amount = payment.p_amount;
        const currentTotal = await this.paymentModel.aggregate([
            {$match:{
                p_customer:new ObjectId(customer)
            }},
            {
              $group:{
                _id:"$p_customer",
                totalAmount:{$sum:"$p_amount"}
              }  
            }
        ]);
        console.log('hjhj',currentTotal);
        
        const totalAmount =currentTotal.length>0 ? currentTotal[0].totalAmount:0;
        await this.walletService.updateWallet(customer,totalAmount+amount);
        let bonusToadd = 0 ;
        if(totalAmount >= 1000){
            bonusToadd = Math.floor(totalAmount/1000)*10;
        }
        
        if((totalAmount+amount)>=1000 && totalAmount < 1000){
            await this.walletService.giveBonus(customer); 
        }
    }

}