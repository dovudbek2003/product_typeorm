import { InjectRepository } from "@nestjs/typeorm"
import { File } from "./entities/file.entity"
import { Repository } from "typeorm"
import { IFileRepository } from "./interfaces/file.repository"

export class FileRepository implements IFileRepository {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>) { }
    async create(entity: File): Promise<File> {
        return await this.fileRepository.save(entity)
    }

    async findOneById(id: number): Promise<File> {
        return await this.fileRepository.findOneBy({ id })
    }

    async findAll(): Promise<File[]> {
        return await this.fileRepository.find()
    }

    async update(entity: File): Promise<File> {
        return await this.fileRepository.save(entity)
    }

    async remove(id: number): Promise<File> {
        const foundFile = await this.findOneById(id)
        await this.fileRepository.delete(id)
        return foundFile
    }
}