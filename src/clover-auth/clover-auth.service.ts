import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isEmpty } from "lodash";
import * as moment from "moment";
import * as HmacSHA256 from "crypto-js/hmac-sha256";
import { enc } from "crypto-js";
import { v4 } from "uuid";
@Injectable()
export class CloverAuthService {
    private readonly logger: Logger;
    protected key: string;
    protected secret: string;
    protected baseUrl: string;
    constructor(private config: ConfigService) {
        this.key = this.config.get("CLOVER_API_KEY");
        this.secret = this.config.get("CLOVER_SECRET_KEY");
        this.baseUrl = this.config.get("CLOVER_BASE_URL");
        this.logger = new Logger(CloverAuthService.name);
    }
    public async wrapRequestWithSignature({
        body,
        method = "GET",
        url = null,
    }: any) {
        if (!url || isEmpty(url)) {
            throw new Error("url is required");
        }
        const clientRequestId = v4();
        const timestamp = moment().valueOf();
        const apiKey = this.key;
        const secretKey = this.secret;
        const requestBody = JSON.stringify(body);
        const fullUrl = `${this.baseUrl}${url}`;
        let requestMessageContent = isEmpty(body) ? "" : requestBody;
        this.logger.debug("requestMessageContent", requestMessageContent);
        const messageSignatureContent = [
            apiKey,
            clientRequestId,
            timestamp,
            requestMessageContent,
        ].join("");
        this.logger.debug("messageSignatureContent", messageSignatureContent);
        this.logger.debug("secretKey", secretKey);
        const messageSignature = HmacSHA256(messageSignatureContent, secretKey);
        this.logger.debug("messageSignature", messageSignature);
        const messageSignatureBase64 = enc.Base64.stringify(messageSignature);
        this.logger.debug("messageSignatureBase64", messageSignatureBase64);
        let options: any = {
            method: method || "POST",
            headers: {
                "Content-Type": "application/json",
                "Client-Request-Id": clientRequestId,
                "Api-Key": this.key,
                Timestamp: timestamp,
                "Message-Signature": messageSignatureBase64,
            },
        };

        if (method !== "GET") {
            options.body = requestBody;
        }
        this.logger.debug("options", options);

        const response = await fetch(fullUrl, options);
        const data = await response.json();
        return data;
    }
    async getSignature({ body, method = "GET", url }) {
        return await this.wrapRequestWithSignature({ body, method, url });
    }
}
