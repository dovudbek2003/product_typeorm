import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { FileBadRequest } from './exception/file.exception';
import { FileRepository } from './file.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    //       const uploadPath = 'upload';

    //       if (!existsSync(uploadPath)) {
    //         mkdirSync(uploadPath)
    //       }

    //       const fileType = file.mimetype.split('/')[0]
    //       if (fileType === 'image') {
    //         cb(null, uploadPath)
    //       } else {
    //         cb(new FileBadRequest(fileType), uploadPath)
    //       }

    //     },
    //     filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
    //       cb(
    //         null,
    //         `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`
    //       )
    //     }
    //   })
    //   // dest: './upload',
    // })
  ],
  controllers: [FileController],
  providers: [
    { provide: 'IFileService', useClass: FileService },
    { provide: 'IFileRepository', useClass: FileRepository }
  ],
})
export class FileModule { }
