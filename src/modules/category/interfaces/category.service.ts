import { ResData } from "src/lib/resData";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import { UpdateCategoryDto } from "../dto/update-category.dto";

export interface ICategoryService {
    create(createCategoryDto: CreateCategoryDto): Promise<ResData<Category>>
    findByName(name: string): Promise<Category>
    findOne(id: number): Promise<ResData<Category>>
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResData<Category>>
    findAll(): Promise<ResData<Array<Category>>>
    remove(id: number): Promise<ResData<Category>>
}