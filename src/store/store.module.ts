import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Store, StoreSchema } from './schemas/store.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schemas';

@Module({
  imports:[MongooseModule.forFeature([{name:Store.name,schema:StoreSchema},{name:User.name,schema:UserSchema}])],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}