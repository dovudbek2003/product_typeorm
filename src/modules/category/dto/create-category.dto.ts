import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    name:string;
}
