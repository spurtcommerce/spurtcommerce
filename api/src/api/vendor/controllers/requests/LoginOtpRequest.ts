import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyOtpRequest {

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    public emailId: string;

    @IsNotEmpty({ message: 'Password is required' })
    public password: string;
}
