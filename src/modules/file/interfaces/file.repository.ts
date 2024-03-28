import { File } from "../entities/file.entity"

export interface IFileRepository {
    create(entity: File): Promise<File>
    findOneById(id: number): Promise<File>
    findAll(): Promise<Array<File>>
    update(entity: File): Promise<File>
    remove(id: number): Promise<File>
}