export declare class RegisterUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
export declare class LoginUserDto {
    readonly email: string;
    readonly password: string;
}
export declare class ChangePasswordDto {
    readonly id_user: number;
    readonly password: string;
}
