import { IsNotEmpty } from 'class-validator';

export class BulkOrderUpdateRequest {

    @IsNotEmpty()
    public orderIds: number[];

    @IsNotEmpty()
    public orderStatusId: number;

    public fullfillmentStatusId: number;
}
