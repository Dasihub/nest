import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'users' })
export class UserEntity {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор', type: 'serial4' })
	@PrimaryGeneratedColumn()
	id_user: number

	@ApiProperty({ example: 'dasihub02@gmail.com', description: 'Эл.почта пользователя', type: 'varchar' })
	@Column({ type: 'varchar', length: 100, unique: true })
	email: string

	@ApiProperty({ example: 'Дастан', description: 'Имя пользователя', type: 'varchar' })
	@Column({ type: 'varchar', length: 100 })
	name: string

	@ApiProperty({ example: '123456', description: 'Пароль пользователя', type: 'varchar' })
	@Column({ type: 'varchar' })
	password: string
}
