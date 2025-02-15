import { IsNotEmpty } from 'class-validator';

export class CheckDisplayNameRequest {
    public vendorId: number;

    @IsNotEmpty()
    public displayNameURL: string;

}
