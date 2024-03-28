import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/common/consts/const";
import { Role } from "src/common/enums/role.enum";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)