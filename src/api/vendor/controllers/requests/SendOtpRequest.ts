import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpRequest {

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    public emailId: string;
}
