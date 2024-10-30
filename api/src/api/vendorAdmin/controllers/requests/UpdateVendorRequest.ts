/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
import { KycStatus } from '../../../core/models/Vendor';

export class UpdateVendor {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    public mobileNumber: number;

    @IsNotEmpty()
    public email: string;

    public avatar: string;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;

    public approvalFlag: number;

    public commission: number;

    public companyName: string;

    public companyLogo: string;

    public companyCoverImage: string;

    public companyDescription: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public state: string;

    public zoneId: number;

    public companyCountryId: number;

    public pincode: string;

    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyTaxNumber: string;

    public companyPanNumber: string;

    public paymentInformation: number;

    public companyBusinessNumber: string;

    @IsNotEmpty()
    public vendorGroupId: number;

    public instagram: string;

    public twitter: string;

    public youtube: string;

    public facebook: string;

    public whatsApp: string;

    public displayNameUrl: string;

    public bankDetails: string;

    // public vendorDocument: VendorDocumentRequest[];

    public bankName: string;

    public companyAccountHolderName: string;

    public companyAccountNumber: string;

    public companyAccountBranch: string;

    public companyAccountBic: string;

    public companyAccountCreatedOn: string;

    public companyAccountBankName: string;

    public companyAccountIfsc: string;

    public industryId: number;

    public vendorDocuments: Documents[];

    public kycStatus: KycStatus;
}
export interface Documents {

    documentId?: number;

    fileName?: string;

    filePath?: string;

    status?: number;

    vendorId?: number;
}
