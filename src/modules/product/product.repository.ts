import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { IProductRepository } from "./interfaces/product.repository";
import { Repository } from "typeorm";

export class ProductRepository implements IProductRepository {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
    async create(entity: Product): Promise<Product> {
        return await this.productRepository.save(entity)
    }

    async findOneById(id: number): Promise<Product> {
        return await this.productRepository.findOneBy({ id })
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ['category'] })
    }

    async update(entity: Product): Promise<Product> {
        return await this.productRepository.save(entity)
    }

    async remove(id: number): Promise<Product> {
        const foundProduct = await this.findOneById(id)
        await this.productRepository.delete(id)
        return foundProduct
    }
}