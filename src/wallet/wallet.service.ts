import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './schemas/wallet.schemas';
import mongoose from 'mongoose';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name)
        private walletModel: mongoose.Model<Wallet>,
    ){}
    async findByCustomer(customerId:string):Promise<Wallet>{
        const wallet = await this.walletModel.findOne({customer:customerId});
        if(!wallet){
            throw new NotFoundException('Wallet not found');
        }
        return wallet;
    }
    async create(wallet:Wallet):Promise<Wallet>{
        const createdWallet = await this.walletModel.create(wallet);
        await this.giveBonus(wallet.customer.toString());
        return createdWallet;
    }
    async getWalletBycustomer(customerId:string):Promise<Wallet>{
        const wallet = await this.walletModel.findOne({customer:customerId});
        if(!wallet){
            throw new NotFoundException('wallet not found');
        }
        wallet.bonus = Math.floor(wallet.total/1000)*10;
        return wallet;
    }
    async updateWallet(customerId:string , totalAmount:number):Promise<void>{
        await this.walletModel.updateOne(
            {customer:customerId},
            {total:totalAmount}
        )
    }
    async giveBonus(customerId:string):Promise<void>{
        await this.walletModel.updateOne(
            {customer:customerId},
            {$inc:{total:10,bonus:10}}
        )
    }   
}
