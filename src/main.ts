import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestApplicationOptions } from "@nestjs/common";
const PORT = process.env.PORT || 8080;
async function bootstrap() {
    const opts: NestApplicationOptions = {
        logger: ["error", "warn", "log", "verbose"],
    };
    const app = await NestFactory.create(AppModule, opts);
    app.enableCors();
    await app.listen(PORT);
}
bootstrap();
