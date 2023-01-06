import { IsEmail, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
	@ApiProperty({ example: 'Дастан', description: 'Имя пользователя' })
	readonly name: string

	@ApiProperty({ example: 'dasihub02@gmail.com', description: 'Эл.почта пользователя' })
	@IsEmail({}, { message: 'Неправильный email' })
	readonly email: string

	@ApiProperty({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 })
	@Length(4, 50, { message: 'Минимальный пароль 4' })
	readonly password: string
}

export class LoginUserDto {
	@ApiProperty({ example: 'dasihub02@gmail.com', description: 'Эл.почта пользователя' })
	@IsEmail({}, { message: 'Неправильный email' })
	readonly email: string

	@ApiProperty({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 })
	readonly password: string
}

export class ChangePasswordDto {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
	readonly id_user: number

	@ApiProperty({ example: '123456', description: 'Пароль пользователя', minLength: 4, maxLength: 50 })
	readonly password: string
}
