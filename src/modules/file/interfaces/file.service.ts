import { ResData } from "src/lib/resData"
import { CreateFileDto } from "../dto/create-file.dto"
import { UpdateFileDto } from "../dto/update-file.dto"
import { File } from "../entities/file.entity"

export interface IFileService {
    create(fileData: Express.Multer.File): Promise<ResData<File>>

    findAll(): Promise<ResData<Array<File>>>

    findOne(id: number): Promise<ResData<File>>

    update(id: number, updateFileDto: UpdateFileDto): Promise<ResData<File>>

    remove(id: number): Promise<ResData<File>>
}