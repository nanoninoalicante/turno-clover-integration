import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { CloverAuthService } from "./clover-auth.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("clover-auth")
export class CloverAuthController {
    constructor(protected service: CloverAuthService) {}
    @Post("signature")
    async getSignature(@Body() body: any) {
        const input: any = { body, method: "POST" };
        return this.service.getSignature(input);
    }
}
