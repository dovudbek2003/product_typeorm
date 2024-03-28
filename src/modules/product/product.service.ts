import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductRepository } from './interfaces/product.repository';
import { ICategoryService } from '../category/interfaces/category.service';
import { ResData } from 'src/lib/resData';
import { Product } from './entities/product.entity';
import { ProductNotFound } from './exception/product.exception';
import { User } from '../user/entities/user.entity';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository') private readonly repository: IProductRepository,
    @Inject('ICategoryService') private readonly categoryService: ICategoryService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) { }

  async create(createProductDto: CreateProductDto, currentUser: User): Promise<ResData<Product>> {
    let newProduct = new Product()
    newProduct = Object.assign(newProduct, createProductDto)

    const { data: foundCategory } = await this.categoryService.findOne(createProductDto.categoryId)
    newProduct.category = foundCategory
    newProduct.createdBy = currentUser

    const createdProduct = await this.repository.create(newProduct)

    await this.cacheManager.del(RedisKeys.ALL_PRODUCTS)

    return new ResData("create", 200, createdProduct)
  }

  async findAll(): Promise<ResData<Product[]>> {
    const products = await this.repository.findAll()

    return new ResData<Array<Product>>('get all', 200, products)
  }

  async findOne(id: number): Promise<ResData<Product>> {
    const foundProduct = await this.repository.findOneById(id)
    if (!foundProduct) {
      throw new ProductNotFound()
    }

    return new ResData('get one', 200, foundProduct)
  }

  async update(id: number, updateProductDto: UpdateProductDto, currentUser: User): Promise<ResData<Product>> {
    const { data: foundCategory } = await this.categoryService.findOne(updateProductDto.categoryId)

    const { data: foundProduct } = await this.findOne(id)
    const newProduct = Object.assign(foundProduct, updateProductDto)
    newProduct.category = foundCategory
    newProduct.lastEditedBy = currentUser

    const updatedProduct = await this.repository.update(newProduct)

    await this.cacheManager.del(RedisKeys.ALL_PRODUCTS)

    return new ResData('update', 200, updatedProduct)
  }

  async remove(id: number): Promise<ResData<Product>> {
    await this.findOne(id)
    const deletedProduct = await this.repository.remove(id)

    await this.cacheManager.del(RedisKeys.ALL_PRODUCTS)

    return new ResData<Product>('delete', 200, deletedProduct)
  }
}
