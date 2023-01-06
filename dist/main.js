"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const PORT = process.env.PORT;
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use(compression());
        const config = new swagger_1.DocumentBuilder()
            .setTitle('CRUD приложение на Typeorm')
            .setDescription('CRUD приложение на Typeorm Postgresql')
            .setVersion('1.0.0')
            .setContact('Dosya', 'https://github.com/Dasihub', 'dasihub02@gmail.com')
            .addTag('Dosya')
            .addSecurity('Dosya', { type: 'http' })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/api/docs', app, document);
        await app.listen(PORT, () => console.log(`Server working in port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map