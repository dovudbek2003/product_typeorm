import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFound extends HttpException {
    constructor() {
        super("product not found", HttpStatus.NOT_FOUND)
    }
}