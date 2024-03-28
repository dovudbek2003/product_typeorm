import { ResData } from "src/lib/resData";
import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
    create(entity: Category): Promise<Category>
    findByName(name: string): Promise<Category>
    findOneById(id: number): Promise<Category>
    update(entity: Category): Promise<Category>
    findAll(): Promise<Array<Category>>
    remove(id: number): Promise<Category>
}