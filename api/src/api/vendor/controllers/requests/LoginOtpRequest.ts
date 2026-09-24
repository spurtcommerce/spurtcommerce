import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class VerifyOtpRequest {

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    public emailId: string;

    @IsNotEmpty({ message: 'OTP is required' })
    @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
    @Matches(/^\d{6}$/, { message: 'OTP must contain only numbers' })
    public otp: string;
}
