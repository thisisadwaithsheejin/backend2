import { Body, Controller , Get, Param, Post} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './schemas/wallet.schemas';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Get(':customerId')
    async getWalletBycustomer(@Param('customerId')customerId:string):Promise<Wallet>{
        return this.walletService.findByCustomer(customerId);
    }
    @Post()
    async createWallet(@Body() wallet:Wallet):Promise<Wallet>{
        return this.walletService.create(wallet);
    }

}
