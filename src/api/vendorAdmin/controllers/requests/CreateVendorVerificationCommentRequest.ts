/* tslint:disable:max-classes-per-file */

import { IsNotEmpty } from 'class-validator';

export class VendorVerificationComment {
    @IsNotEmpty()
    public comment: string;

    @IsNotEmpty()
    public commentFor: string;

}
