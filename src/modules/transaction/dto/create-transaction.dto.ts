import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    count: number;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    totalPrice: number;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    productId: number;
}
