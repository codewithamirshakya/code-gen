import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpController } from './otp.controller';
import { Otp, OtpSchema } from './otp.schema';
import { OtpService } from './otp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule { }