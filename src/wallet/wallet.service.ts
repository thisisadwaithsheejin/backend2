import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './schemas/wallet.schemas';
import mongoose from 'mongoose';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name)
        private walletModel: mongoose.Model<Wallet>,
    ){}
    async findAll(): Promise<Wallet[]>{
        const wallets = await this.walletModel.find()
        return wallets;   
    }

    async updateWalletAndGiveBonus(customerId: any, amount: number) {
        let wallet = await this.walletModel.findOne({ customer: customerId });
        if (!wallet) {   
            wallet = await this.walletModel.create({ customer: customerId });
        }
        wallet.balance += amount;
        if (wallet.balance >= 1000) {
        const bonusPoints = Math.floor(wallet.balance / 1000) * 10;
        wallet.balance += bonusPoints;
        wallet.balance %= 1000;
        }
        await wallet.save();
    }
}
