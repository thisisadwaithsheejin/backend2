import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Store } from './schemas/store.schemas';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name)
        private storeModel: mongoose.Model<Store>,
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>
    ){}
    async findAll(query: any, filters: any): Promise<any> {
        const { keyword, category , name , location , createdBy , page, limit, sortField, sortOrder } = filters;
        let findQuery = this.storeModel.find();

        if (keyword) {
            findQuery = findQuery.find({
                $or: [
                    { s_name: { $regex: keyword, $options: 'i' } },
                ]
            });
        }
        if (category) {
            console.log('Applying category filter:', category);
            findQuery = findQuery.where('s_category').equals(category);
        }
    
        if (name) {
            findQuery = findQuery.populate({
                path: 's_createdBy',
                match: { c_name: { $regex: name, $options: 'i' } }
            });
        } else {
            findQuery = findQuery.populate('s_createdBy');
        }
    
        if(location){
            findQuery=findQuery.where('s_location',new RegExp(location,'i'))
        }
    
        if (createdBy) {
            
            const user = await this.userModel.findOne({ userName: createdBy });
            if (user) {
                findQuery = findQuery.where('s_createdBy').equals(user.id);
            }
        }
        
        const total = await this.storeModel.countDocuments(findQuery).exec();
        let pageCount;
        
        console.log('Limit:', limit);
        console.log('Total:', total);

        if (limit && limit > 0) 
        {
            pageCount = Math.ceil(total / limit);
        }
        console.log('Page Count:', pageCount);

        if(page && limit){
            const skip = (page-1)*limit;
            console.log('Applying pagination: skip:', skip, 'limit:', limit);
            findQuery = findQuery.skip(skip).limit(limit);
        }

        if(sortField && sortOrder){
            const sortCriteria={};
            sortCriteria[sortField] = sortOrder ==='asc'?1:-1;
            console.log('Applying sorting: sortField:', sortField, 'sortOrder:', sortOrder);
            findQuery=findQuery.sort(sortCriteria);
        }
    
        const stores = await findQuery.exec();

        const filteredStores = stores.filter(store => store.s_createdBy !== null);
        return {
            total,
            pageCount:Math.ceil(total/limit),
            page,
            limit,
            sortField,
            sortOrder,
            data:filteredStores
        }
    }

    async create(store:Store): Promise<Store>{
        const res = await this.storeModel.create(store)
        return res
    }
    
    async findById(id:string):Promise<Store>{
        const sid = await this.storeModel.findById(id)
        if(!sid){
            throw new NotFoundException('Store not found')
        }   
        return sid
    }

    async updateById(id:string,sid:Store):Promise<Store>{
        return await this.storeModel.findByIdAndUpdate(id,sid,{
            new :true ,
            runValidators: true
        });
    }

    async createStore(store: Store, userName:string): Promise<Store> {
        const user =await this.userModel.findOne({userName})
        if(!user){
            throw new NotFoundException('User not found')
        }
        store.s_createdBy = user.id;
        const res = await this.storeModel.create(store);
        return res;
    } 
       
    async deleteById(id:string):Promise<Store>{
        return await this.storeModel.findByIdAndDelete(id);
    }
    
    async findWithPagination(page: number, limit: number,sortField: string, sortOrder: 'asc' | 'desc') {
        const total = await this.storeModel.countDocuments().exec();
        const pageCount = Math.ceil(total/limit);

        const skip = (page - 1) * limit;
        let query = this.storeModel.find().skip(skip).limit(limit);

        if(sortField && ['asc','desc'].includes(sortOrder)){
            const sortCriteria = {};
            sortCriteria[sortField]=sortOrder==='asc'?1 : -1;
            query = query.sort(sortCriteria);
        }

        query = query.populate({
            path:'s_createdBy',
            select: 'c_name',
        })

        const data = await query.exec();

        return{
            count:data.length,
            data,
            page,
            pageCount,
            total, 
        };
    }
}