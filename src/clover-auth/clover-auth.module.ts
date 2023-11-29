import { Global, Module } from "@nestjs/common";
import { CloverAuthService } from "./clover-auth.service";
import { CloverAuthController } from "./clover-auth.controller";
import { ConfigModule } from "@nestjs/config";
@Global()
@Module({
    imports: [ConfigModule],
    providers: [CloverAuthService],
    controllers: [CloverAuthController],
    exports: [CloverAuthService],
})
export class CloverAuthModule {}
