import { IsOptional } from 'class-validator';

export class BuyerGroupRequest {
    @IsOptional()
    public name: string;

    public description: string;

    public colorCode: string;

    @IsOptional()
    public status: number;
}
