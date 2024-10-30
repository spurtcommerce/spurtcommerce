
import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
export class EmailChangeOtp {
    @IsNotEmpty({message: 'OTP is required'})
    public otp: number;

    @IsNotEmpty({message: 'mail id is required'})
    public emailId: string;
}
