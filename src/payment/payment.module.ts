import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './schemas/payment.schemas';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'Payment',schema:PaymentSchema}]),
  WalletModule,
],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
