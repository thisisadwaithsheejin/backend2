import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto{
    count:number;
    pageCount:number;
    page:number;
    limit:number;   
}