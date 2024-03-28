import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Inject } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOption } from 'src/lib/file';
import { IFileService } from './interfaces/file.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(@Inject('IFileService') private readonly fileService: IFileService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        },
        fileName: {
          type: 'text'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', fileOption))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File, @Body() createFileDto: CreateFileDto
  ) {
    const fileData = { ...file, originalname: createFileDto.fileName ? createFileDto.fileName : file.originalname }
    return this.fileService.create(fileData);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_FILES)
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
