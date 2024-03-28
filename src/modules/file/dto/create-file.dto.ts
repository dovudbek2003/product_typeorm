import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateFileDto {
    @ApiPropertyOptional({ type: String })
    @IsString()
    @IsOptional()
    fileName: string
}
