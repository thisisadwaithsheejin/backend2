import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import mongoose from 'mongoose';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel: mongoose.Model<Customer>,
    ){}
    
    async findAll(): Promise<Customer[]>{
        const customers = await this.customerModel.find()
        return customers;   
    }

    async create(customer:Customer): Promise<Customer>{
        const res = await this.customerModel.create(customer)
        return res
    }

    async findById(id:string):Promise<Customer>{
        const cid = await this.customerModel.findById(id)
        if(!cid){
            throw new NotFoundException('Customer not found')
        }   
        return cid
    }
 
    async updateById(id:string,cid:Customer):Promise<Customer>{
        return await this.customerModel.findByIdAndUpdate(id,cid,{
            new :true ,
            runValidators: true
        });
    }
    
    async deleteById(id:string):Promise<Customer>{
        return await this.customerModel.findByIdAndDelete(id);
        }
}
