import { IsNotEmpty } from 'class-validator';

export class ContactAdminRequest {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    public companyName: string;

    public phoneNumber: string;

    @IsNotEmpty({ message: 'emailId is requier' })
    public emailId: string;

    @IsNotEmpty()
    public userRequirements: string;

    public files: Pdf[];
}
interface Pdf {
    file: string;
}
