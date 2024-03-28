import { Product } from "../entities/product.entity";

export interface IProductRepository {
    create(entity: Product): Promise<Product>
    findOneById(id: number): Promise<Product>
    findAll(): Promise<Array<Product>>
    update(entity: Product): Promise<Product>
    remove(id: number): Promise<Product>
}