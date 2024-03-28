import { HttpException, HttpStatus } from "@nestjs/common";

export class TransactionNotFound extends HttpException {
    constructor() {
        super('transaction not found', HttpStatus.NOT_FOUND)
    }
}
