import { IsNotEmpty } from 'class-validator';

export class CheckDisplayNameURLRequest {
    public vendorId: number;

    @IsNotEmpty()
    public displayNameURL: string;

}
