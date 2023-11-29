import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CloverAuthService } from "src/clover-auth/clover-auth.service";

@Injectable()
export class PaymentsService {
    constructor(
        protected config: ConfigService,
        protected authService: CloverAuthService,
    ) {}
    async createPaymentLink(data: any = {}) {
        const { body } = data;
        const method = "POST";
        const url = "/ipp/payments-gateway/v2/payment-url";
        return await this.authService.wrapRequestWithSignature({
            body,
            method,
            url,
        });
    }
}
