import { InsertResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChangePasswordDto, RegisterUserDto } from './user.dto';
export declare class UserService {
    private userEntity;
    constructor(userEntity: Repository<UserEntity>);
    isPassword(password: string, hashPassword: any): Promise<boolean>;
    encryptPassword(password: string): Promise<string>;
    checkCandidate(email: string): Promise<UserEntity>;
    createUser({ email, name, password }: RegisterUserDto): Promise<InsertResult>;
    changePassword({ password, id_user }: ChangePasswordDto): Promise<UserEntity>;
    deleteUser(id_user: number): Promise<void>;
}
