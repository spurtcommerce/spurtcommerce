/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { KycStatus } from '../../../core/models/Vendor';

export class CreateVendorRequest {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    public email: string;

    @IsNotEmpty()
    public mobileNumber: number;

    @MinLength(8, {
        message: 'password is minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol or one uppercase and lowercase letter, and at least 8 and at most 128 characters' })
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;

    public avatar: string;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;

    public commission: number;

    public companyName: string;

    public companyLocation: string;

    public companyLogo: string;

    public companyCoverImage: string;

    public vendorDescription: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public state: string;

    public zoneId: number;

    public companyCountryId: number;

    public pincode: number;

    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyTaxNumber: string;

    public companyPanNumber: string;

    public companyBusinessNumber: string;

    public paymentInformation: string;

    @IsNotEmpty()
    public vendorGroupId: number;

    public instagram: string;

    public twitter: string;

    public youtube: string;

    public facebook: string;

    public whatsApp: string;

    public displayNameUrl: string;

    // @IsNotEmpty()
    public bankDetails: string;

    // @IsNotEmpty()
    public bankName: string;

    public companyAccountHolderName: string;

    public accountHolderName: string;

    public approvalFlag: number;

    // @IsNotEmpty()
    public companyAccountNumber: string;

    public companyAccountBranch: string;

    public companyAccountBic: string;

    public companyAccountCreatedOn: string;

    // @IsNotEmpty()
    public companyAccountBankName: string;

    public companyAccountIfsc: string;

    public industryId: number;

    public ifscCode: string;

    // @IsNotEmpty()
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
