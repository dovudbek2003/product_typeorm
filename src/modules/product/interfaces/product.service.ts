import { ResData } from "src/lib/resData"
import { CreateProductDto } from "../dto/create-product.dto"
import { Product } from "../entities/product.entity"
import { UpdateProductDto } from "../dto/update-product.dto"
import { User } from "src/modules/user/entities/user.entity"

export interface IProductService {
    create(createProductDto: CreateProductDto, currentUser: User): Promise<ResData<Product>>

    findAll(): Promise<ResData<Array<Product>>>

    findOne(id: number): Promise<ResData<Product>>

    update(id: number, updateProductDto: UpdateProductDto, currentUser:User): Promise<ResData<Product>>

    remove(id: number): Promise<ResData<Product>>
}