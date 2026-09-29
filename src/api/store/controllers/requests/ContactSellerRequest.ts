import { IsNotEmpty } from 'class-validator';

export class ContactSellerRequest {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    @IsNotEmpty({ message: 'emailId is requier' })
    public emailId: string;

    @IsNotEmpty()
    public userRequirements: string;

    @IsNotEmpty()
    public vendorEmailId: string;

    public files: Pdf[];
}
interface Pdf {
    file: string;
}
