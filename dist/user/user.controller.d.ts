import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from './user.dto';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterUserDto): Promise<{
        message: string;
        type: string;
        data: any[];
    }>;
    login(body: LoginUserDto): Promise<{
        message: string;
        type: string;
        data: {
            email?: undefined;
            name?: undefined;
            id_user?: undefined;
        };
        token: string;
    } | {
        message: string;
        type: string;
        data: {
            email: string;
            name: string;
            id_user: number;
        };
        token: string;
    }>;
    changePassword(body: ChangePasswordDto): Promise<{
        message: string;
        type: string;
        data: any[];
    }>;
    deleteUser({ id_user }: {
        id_user: any;
    }): Promise<{
        message: string;
        type: string;
        data: any[];
    }>;
}
