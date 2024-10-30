import { IsNotEmpty } from 'class-validator';

export class VendorVerifiedRequest {
    @IsNotEmpty()
    public key: string;

    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    public password: string;

}
