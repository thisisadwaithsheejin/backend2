import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.schemas';

@Module({
  imports:[MongooseModule.forFeature([{name:'Wallet',schema:WalletSchema}])],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
