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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDto = exports.LoginUserDto = exports.RegisterUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Дастан', description: 'Имя пользователя' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dasihub02@gmail.com', description: 'Эл.почта пользователя' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Неправильный email' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 }),
    (0, class_validator_1.Length)(4, 50, { message: 'Минимальный пароль 4' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
exports.RegisterUserDto = RegisterUserDto;
class LoginUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dasihub02@gmail.com', description: 'Эл.почта пользователя' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Неправильный email' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;
class ChangePasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Уникальный идентификатор пользователя' }),
    __metadata("design:type", Number)
], ChangePasswordDto.prototype, "id_user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "password", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
//# sourceMappingURL=user.dto.js.map