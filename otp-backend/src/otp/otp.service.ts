import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nodemailer } from 'nodemailer';
import { Otp, OtpDocument } from './otp.schema';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
        private configService: ConfigService,
    ) { }

    async generateOtp(email: string): Promise<void> {
        console.log('generating', email);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 5); // OTP valid for 5 minutes

        const newOtp = new this.otpModel({ email, otp, expiration });
        await newOtp.save();

        // await this.sendOtpEmail(email, otp);
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        const record = await this.otpModel.findOne({ email, otp }).exec();
        if (record && record.expiration > new Date()) {
            return true;
        }
        return false;
    }

    private async sendOtpEmail(email: string, otp: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<string>('EMAIL_PORT'),
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });

        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
    }
}
