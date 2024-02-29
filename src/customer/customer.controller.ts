import { Body, Controller,Delete,Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { createCustomerDto } from './dto/create-customer.dto';
import { updateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    async getAllCustomer(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Post()
    async createCustomer(@Body() customer: createCustomerDto): Promise<Customer> {
        return this.customerService.create(customer);
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<Customer> {
        return this.customerService.findById(id);
    }

    @Put(':id')
    async UpdateCustomer(@Param('id') id: string, @Body() customer: updateCustomerDto): Promise<Customer> {
        return this.customerService.updateById(id, customer);
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<Customer> {
        return this.customerService.deleteById(id);
    }

}
