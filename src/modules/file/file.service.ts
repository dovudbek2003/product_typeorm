import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { IFileService } from './interfaces/file.service';
import { ResData } from 'src/lib/resData';
import { File } from './entities/file.entity';
import { IFileRepository } from './interfaces/file.repository';
import * as path from 'path';
import * as fs from "fs"
import { FileNotFound } from './exception/file.exception';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/redis.enum';



@Injectable()
export class FileService implements IFileService {
  constructor(
    @Inject('IFileRepository') private readonly repository: IFileRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache
  ) { }

  async create(fileData: Express.Multer.File): Promise<ResData<File>> {
    const directory = path.join(__dirname, "../../../", 'upload/')
    const newFileData = new File()

    newFileData.location = directory + fileData.filename
    newFileData.mimetype = fileData.mimetype
    newFileData.name = fileData.originalname
    newFileData.size = fileData.size

    const createdFile = await this.repository.create(newFileData)

    await this.cacheManager.del(RedisKeys.ALL_FILES)

    return new ResData<File>('create', 201, createdFile)
  }

  async findAll(): Promise<ResData<File[]>> {
    const files = await this.repository.findAll()
    return new ResData<Array<File>>('get all', 200, files)
  }

  async findOne(id: number): Promise<ResData<File>> {
    const foundFile = await this.repository.findOneById(id)
    if (!foundFile) {
      throw new FileNotFound()
    }

    return new ResData<File>('get one', 200, foundFile)
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<ResData<File>> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<ResData<File>> {
    const { data: foundFile } = await this.findOne(id)
    await fs.unlinkSync(foundFile.location)

    const deletedFile = await this.repository.remove(id)

    await this.cacheManager.del(RedisKeys.ALL_FILES)

    return new ResData<File>('delete', 200, deletedFile)
  }
}
