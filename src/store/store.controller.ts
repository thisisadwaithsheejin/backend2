import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './schemas/store.schemas';
import { createStoreDto } from './dto/create-store.dto';
import { updateStoreDto } from './dto/update-store.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('stores')
export class StoreController {

    constructor(private storeService: StoreService) {}

    @Get()
    async getAllStore(@Query() query: any): Promise<Store[]> {
        const { keyword, category , location , limit , page} = query;
        const filters = { keyword, category , location , limit , page};
        return this.storeService.findAll(query, filters);
    }   
    @Post()
    async createStore(@Body() store: createStoreDto,@Req() req: any): Promise<Store> {
        const userName = req.user.userName;
        return this.storeService.createStore(store,userName);
    }

    @Get(':id')
    async getStore(@Param('id') id: string): Promise<Store> {
        return this.storeService.findById(id);
    }
    @Put(':id')
    async UpdateStore(@Param('id') id: string, @Body() store: updateStoreDto): Promise<Store> {
        return this.storeService.updateById(id, store);
    }
    @Delete(':id')
    async deleteStore(@Param('id') id: string): Promise<Store> {
        return this.storeService.deleteById(id);
    }
    
    @Post('list')
    async getStores(
        @Body() paginationDto: PaginationDto,
        @Body('sortField') sortField?:string,        
        @Body('sortOrder') sortOrder?:'asc'|'desc',                
        ){
    const { page, limit } = paginationDto;
    return this.storeService.findWithPagination(page, limit , sortField ,sortOrder);
  }
}