import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make ConfigModule globally available
    MongooseModule.forRoot(process.env.MONGO_URI),
    OtpModule,
    DatabaseModule,
  ],
})
export class AppModule { }