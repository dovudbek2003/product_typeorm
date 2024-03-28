import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFound extends HttpException {
    constructor() {
        super('category not found', HttpStatus.NOT_FOUND)
    }
}

export class CategoryAlreadyExist extends HttpException {
    constructor() {
        super('category already exist', HttpStatus.BAD_REQUEST)
    }
}