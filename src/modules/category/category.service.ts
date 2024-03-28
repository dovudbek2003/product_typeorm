import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryRepository } from './interfaces/category.repository';
import { ICategoryService } from './interfaces/category.service';
import { ResData } from 'src/lib/resData';
import { Category } from './entities/category.entity';
import { CategoryAlreadyExist, CategoryNotFound } from './exception/category.exception';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository') private readonly repository: ICategoryRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ResData<Category>> {
    if (await this.findByName(createCategoryDto.name)) {
      throw new CategoryAlreadyExist()
    }

    let newCategory = new Category()
    newCategory = Object.assign(newCategory, createCategoryDto)

    const newData = await this.repository.create(newCategory)

    await this.cacheManager.del(RedisKeys.ALL_CATEGORIES)

    return new ResData('create', 201, newData)
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findByName(name)
  }

  async findAll(): Promise<ResData<Array<Category>>> {
    const categories = await this.repository.findAll()

    return new ResData('get all', 200, categories)
  }

  async findOne(id: number): Promise<ResData<Category>> {
    const foundCategory = await this.repository.findOneById(id)
    if (!foundCategory) {
      throw new CategoryNotFound()
    }

    return new ResData('get one', 200, foundCategory)
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResData<Category>> {
    const { data: foundCategory } = await this.findOne(id)

    const updateData = Object.assign(foundCategory, updateCategoryDto)

    const updatedCategory = await this.repository.update(updateData)

    await this.cacheManager.del(RedisKeys.ALL_CATEGORIES)

    return new ResData("updated", 200, updatedCategory)

  }

  async remove(id: number): Promise<ResData<Category>> {
    await this.findOne(id)

    const deletedData = await this.repository.remove(id)

    await this.cacheManager.del(RedisKeys.ALL_CATEGORIES)

    return new ResData('delete', 200, deletedData)
  }
}
