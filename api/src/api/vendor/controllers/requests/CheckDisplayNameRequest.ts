import { IsNotEmpty } from 'class-validator';

export class CheckDisplayNameRequest {
    public tenantId: number;

    @IsNotEmpty()
    public displayNameURL: string;

}
