import { Module, forwardRef } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schemas';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Wallet.name,schema:WalletSchema}]),
    forwardRef(() => PaymentModule),
],
  providers: [WalletService],
  controllers: [WalletController],
  exports:[WalletService]
})
export class WalletModule {}