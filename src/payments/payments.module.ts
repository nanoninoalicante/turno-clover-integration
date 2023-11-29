import { Global, Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { ConfigModule } from "@nestjs/config";
import { CloverAuthModule } from "src/clover-auth/clover-auth.module";

@Global()
@Module({
    imports: [ConfigModule, CloverAuthModule],
    providers: [PaymentsService],
    controllers: [PaymentsController],
})
export class PaymentsModule {}
