import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ type: Number })
    @IsInt()
    @IsNotEmpty()
    count: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    categoryId: number
}
