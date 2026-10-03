/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVendorDomainRequest {
    @IsNotEmpty({ message: 'Domain name is required' })
    @IsString({ message: 'Domain name must be a string' })
    public domainName: string;

    @IsNotEmpty({ message: 'Vendor settings id is required' })
    public vendorSettingsId: number;

    public isActive: number;

    public isPrimary: number;
}
