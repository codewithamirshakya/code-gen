import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('generate')
    async generateOtp(@Body('email') email: string) {
        await this.otpService.generateOtp(email);
        return { message: 'OTP sent' };
    }

    @Post('validate')
    async validateOtp(@Body() body: { email: string; otp: string }) {
        const isValid = await this.otpService.validateOtp(body.email, body.otp);
        return { isValid };
    }
}


