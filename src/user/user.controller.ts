import { Controller, Post, Delete, Put, HttpStatus, HttpException, HttpCode, Body, Param, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from './user.dto'
import { UserGuard } from './user.guard'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './user.entity'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: HttpStatus.CREATED, type: UserEntity, description: 'success' })
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() body: RegisterUserDto) {
		try {
			const candidate = await this.userService.checkCandidate(body.email)

			if (candidate) {
				return {
					message: `Пользователь с такой ${body.email} эл.почтой уже существует`,
					type: 'warn',
					data: []
				}
			}

			const { raw } = await this.userService.createUser(body)

			if (raw.length) {
				return {
					message: 'Пользователь успешно зарегистирован',
					type: 'success',
					data: []
				}
			}

			return {
				message: 'Не удалось зарегистрироваться',
				type: 'warn',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: HttpStatus.ACCEPTED, type: UserEntity, description: 'success' })
	@HttpCode(HttpStatus.ACCEPTED)
	@Post('login')
	async login(@Body() body: LoginUserDto) {
		try {
			const isUser = await this.userService.checkCandidate(body.email)

			if (!isUser) {
				return {
					message: 'Такой пользователь не существует',
					type: 'warn',
					data: {},
					token: ''
				}
			}

			const { password, id_user, name, email } = isUser
			const isPassword: boolean = await this.userService.isPassword(body.password, password)

			if (!isPassword) {
				return {
					message: 'Неправильный пароль',
					type: 'warn',
					data: {},
					token: ''
				}
			}

			const token = this.jwtService.sign({ email, id_user, name }, { expiresIn: '1d' })

			return {
				message: 'Авторизация прошла успешно',
				type: 'success',
				data: { email, name, id_user },
				token
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@ApiOperation({ summary: 'Поменять пароль пользователя' })
	@ApiResponse({ status: HttpStatus.OK, description: 'success' })
	@UseGuards(UserGuard)
	@HttpCode(HttpStatus.OK)
	@Put('change-password')
	async changePassword(@Body() body: ChangePasswordDto) {
		try {
			const user = await this.userService.changePassword(body)

			if (user) {
				return {
					message: 'Пароль успешно изменен',
					type: 'success',
					data: []
				}
			}

			return {
				message: 'Пароль не удалось изменить',
				type: 'warn',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiResponse({ status: HttpStatus.OK, description: 'success' })
	@UseGuards(UserGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id_user')
	async deleteUser(@Param() { id_user }: { id_user }) {
		try {
			await this.userService.deleteUser(id_user)

			return {
				message: 'Пользователь успешно удален',
				type: 'success',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
