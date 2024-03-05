import { Controller , Get} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './schemas/wallet.schemas';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Get()
    async getAllWallet(): Promise<Wallet[]> {
        return this.walletService.findAll();
    }
}