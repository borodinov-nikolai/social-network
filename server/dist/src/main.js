"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const PORT = process.env.PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Practice api')
        .setDescription('The practice api description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(PORT, () => console.log(`server started at ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map