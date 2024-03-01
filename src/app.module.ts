import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TestMiddleware } from './middleware/test.middleware';
import { StoreModule } from './store/store.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    JwtModule.register
    ({secret:'JWT_SECRET',
  }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CustomerModule,
    AuthModule,
    StoreModule,
    PaymentModule,
    WalletModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware)
    .exclude({path:'auth/signup',method:RequestMethod.POST},{path:'auth/login',method:RequestMethod.POST})
    .forRoutes('*');
  }
}
