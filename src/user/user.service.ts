import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InsertResult, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { ChangePasswordDto, RegisterUserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private userEntity: Repository<UserEntity>) {}

	async isPassword(password: string, hashPassword): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hashPassword)
		} catch (e) {
			console.log(e)
		}
	}

	async encryptPassword(password: string) {
		try {
			return await bcrypt.hash(password, 4)
		} catch (e) {
			console.log(e)
		}
	}

	async checkCandidate(email: string): Promise<UserEntity> {
		try {
			return await this.userEntity.findOne({ where: { email } })
		} catch (e) {
			console.log(e)
		}
	}

	async createUser({ email, name, password }: RegisterUserDto): Promise<InsertResult> {
		try {
			const hashPassword = await this.encryptPassword(password)
			return await this.userEntity.insert({ email, name, password: hashPassword })
		} catch (e) {
			console.log(e)
		}
	}

	async changePassword({ password, id_user }: ChangePasswordDto): Promise<UserEntity> {
		try {
			const user: UserEntity = await this.userEntity.findOne({ where: { id_user } })
			user.password = await this.encryptPassword(password)

			return await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async deleteUser(id_user: number) {
		try {
			await this.userEntity.delete({ id_user })
		} catch (e) {
			console.log(e)
		}
	}
}
