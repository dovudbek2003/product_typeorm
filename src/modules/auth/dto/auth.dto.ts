import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    password: string;
}
