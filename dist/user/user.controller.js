"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const user_guard_1 = require("./user.guard");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(body) {
        try {
            const candidate = await this.userService.checkCandidate(body.email);
            if (candidate) {
                return {
                    message: `Пользователь с такой ${body.email} эл.почтой уже существует`,
                    type: 'warn',
                    data: []
                };
            }
            const { raw } = await this.userService.createUser(body);
            if (raw.length) {
                return {
                    message: 'Пользователь успешно зарегистирован',
                    type: 'success',
                    data: []
                };
            }
            return {
                message: 'Не удалось зарегистрироваться',
                type: 'warn',
                data: []
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            const isUser = await this.userService.checkCandidate(body.email);
            if (!isUser) {
                return {
                    message: 'Такой пользователь не существует',
                    type: 'warn',
                    data: {},
                    token: ''
                };
            }
            const { password, id_user, name, email } = isUser;
            const isPassword = await this.userService.isPassword(body.password, password);
            if (!isPassword) {
                return {
                    message: 'Неправильный пароль',
                    type: 'warn',
                    data: {},
                    token: ''
                };
            }
            const token = this.jwtService.sign({ email, id_user, name }, { expiresIn: '1d' });
            return {
                message: 'Авторизация прошла успешно',
                type: 'success',
                data: { email, name, id_user },
                token
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changePassword(body) {
        try {
            const user = await this.userService.changePassword(body);
            if (user) {
                return {
                    message: 'Пароль успешно изменен',
                    type: 'success',
                    data: []
                };
            }
            return {
                message: 'Пароль не удалось изменить',
                type: 'warn',
                data: []
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser({ id_user }) {
        try {
            await this.userService.deleteUser(id_user);
            return {
                message: 'Пользователь успешно удален',
                type: 'success',
                data: []
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация пользователя' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: user_entity_1.UserEntity, description: 'success' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация пользователя' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.ACCEPTED, type: user_entity_1.UserEntity, description: 'success' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Поменять пароль пользователя' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'success' }),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление пользователя' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'success' }),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)(':id_user'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map