import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PaymentsModule } from "./payments/payments.module";
import { CloverAuthModule } from "./clover-auth/clover-auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        PaymentsModule,
        CloverAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
