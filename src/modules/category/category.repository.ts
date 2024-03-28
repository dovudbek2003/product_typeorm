import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryRepository } from "./interfaces/category.repository";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }


    async remove(id: number): Promise<Category> {
        const foundCategory = this.findOneById(id)
        await this.categoryRepository.delete(id)
        return foundCategory
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }

    async update(entity: Category): Promise<Category> {
        return await this.categoryRepository.save(entity)
    }

    async findOneById(id: number): Promise<Category> {
        return await this.categoryRepository.findOneBy({ id })
    }

    async findByName(name: string): Promise<Category> {
        return await this.categoryRepository.findOneBy({ name })
    }

    async create(entity: Category): Promise<Category> {
        return await this.categoryRepository.save(entity)
    }
}