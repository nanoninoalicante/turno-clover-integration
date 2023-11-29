import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { PaymentsService } from "./payments.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("payments")
export class PaymentsController {
    constructor(protected service: PaymentsService) {}
    @Post("create-payment-link")
    async createPaymentLink(@Body() body: any) {
        const input: any = { body };
        return this.service.createPaymentLink(input);
    }
}
