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
}
