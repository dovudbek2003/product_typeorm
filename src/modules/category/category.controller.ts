import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryService } from './interfaces/category.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(@Inject('ICategoryService') private readonly categoryService: ICategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_CATEGORIES)
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
