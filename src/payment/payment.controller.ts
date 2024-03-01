import { Body, Controller,Get, Param, Post, Put, Delete} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './schemas/payment.schemas';
import { createPaymentDto } from './dto/create-payment.dto';
import { updatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Get()
    async getAllPayment(): Promise<Payment[]> {
        return this.paymentService.findAll();
    }
    
    @Post()
    async createPayment(@Body() payment: createPaymentDto): Promise<Payment> {
        return this.paymentService.create(payment);
    }

    @Get(':id')
    async getPayment(@Param('id') id: string): Promise<Payment> {
        return this.paymentService.findById(id);
    }

    @Put(':id')
    async UpdatePayment(@Param('id') id: string, @Body() payment: updatePaymentDto): Promise<Payment> {
        return this.paymentService.updateById(id, payment);
    }

    @Delete(':id')
    async deletePayment(@Param('id') id: string): Promise<Payment> {
        return this.paymentService.deleteById(id);
    }
    
}
