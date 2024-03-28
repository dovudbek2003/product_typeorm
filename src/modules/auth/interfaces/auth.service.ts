import { User } from "src/modules/user/entities/user.entity";

export interface ILoginData {
    user: User;
    token: string;
}