import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: String, enum: Role })
    @IsEnum(Role)
    role: Role
}
