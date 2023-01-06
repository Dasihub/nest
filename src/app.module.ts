import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { UserEntity } from './user/user.entity'

@Module({
	providers: [],
	controllers: [],
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			database: process.env.DATABASE_NAME,
			port: Number(process.env.DATABASE_PORT),
			host: process.env.DATABASE_HOST,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			entities: [UserEntity],
			synchronize: true
		}),
		UserModule
	]
})
export class AppModule {}
