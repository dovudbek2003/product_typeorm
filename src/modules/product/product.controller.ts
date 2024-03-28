import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './interfaces/product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(@Inject('IProductService') private readonly productService: IProductService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() currentUser: User) {
    return this.productService.create(createProductDto, currentUser);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_PRODUCTS)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser: User) {
    return this.productService.update(+id, updateProductDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
