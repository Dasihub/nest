import * as compression from 'compression'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule)
		const PORT = process.env.PORT

		app.setGlobalPrefix('api')
		app.useGlobalPipes(new ValidationPipe())
		app.use(compression())

		const config = new DocumentBuilder()
			.setTitle('CRUD приложение на Typeorm')
			.setDescription('CRUD приложение на Typeorm Postgresql')
			.setVersion('1.0.0')
			.setContact('Dosya', 'https://github.com/Dasihub', 'dasihub02@gmail.com')
			.addTag('Dosya')
			.addSecurity('Dosya', { type: 'http' })
			.build()

		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('/api/docs', app, document)

		await app.listen(PORT, () => console.log(`Server working in port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

bootstrap()
