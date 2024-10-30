/* tslint:disable:max-classes-per-file */

import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

class DocumentRequest {
    @IsNotEmpty()
    public documentId: number;

    @IsNotEmpty()
    public status: number;

}

export class UpdateVendorDocument {

    @IsNotEmpty()
    public vendorId: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => DocumentRequest)
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    public documents: DocumentRequest[];
}
