/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsOptional, Matches, MaxLength, ValidateIf } from 'class-validator';
export class UpdateVendorRequest {
    @IsOptional()
    @IsNotEmpty({
        message: 'first name is required',
    })
    @IsOptional()
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    public firstName: string;

    @IsOptional()
    @MaxLength(32, {
        message: 'lastname should be maximum 32 character',
    })
    public lastName: string;

    public avatar: string;

    public designation: string;

    public gender: string;

    public dob: string;

    @IsOptional({
        message: 'Email Id is required',
    })
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    public email: string;

    @IsOptional({
        message: 'mobile number is required',
    })
    public mobileNumber: number;

    @IsOptional()
    @MaxLength(255, {
        message: 'companyName should be maximum 255 character',
    })
    public companyName: string;

    public companyLogo: string;

    public companyCoverImage: string;

    @IsOptional()
    @MaxLength(255, {
        message: 'companyAddress1 should be maximum 255 character',
    })
    public companyAddress1: string;

    @IsOptional()
    @MaxLength(255, {
        message: 'companyAddress2 should be maximum 255 character',
    })
    public companyAddress2: string;

    public companyWhatsapp: string;

    public companyYoutube: string;

    public companyGstNumber: string;

    @IsOptional()
    @MaxLength(255, {
        message: 'companyCity should be maximum 255 character',
    })
    public companyCity: string;

    public countryName: string;

    public state: string;

    public zoneId: number;

    public companyInstagram: string;

    public companyCountryId: number;

    public pincode: number;

    public companyFacebook: string;

    public companyMobileNumber: number;

    @IsOptional()
    @MaxLength(96, {
        message: 'companyEmailId should be maximum 96 character',
    })
    public companyEmailId: string;

    @ValidateIf(c => c.companyWebsite !== '' && c.companyWebsite !== null && c.companyWebsite !== undefined)
    @Matches(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/, { message: 'Invalid Website Url' })
    public companyWebsite: string;

    public companyTaxNumber: string;

    public companyPanNumber: string;

    public paymentInformation: string;

    public reset: number;

    public businessType: string;

    public businessSegment: string;

    public companyBusinessNumber: string;

    public landmark: string;

    public preferredShippingMethod: string;

    public displayName: string;

    public companyLocation: string;

    public bankPayload: BankPayload;

    public capabilities: Capabilitie[];

    public vendorDescription: string;

    public vendorMedia: VendorMedia[];

    public personalizedSetting: Personalized;

}

interface BankPayload {

    bankAddress1: string;

    bankAddress2: string;

    bankArea: string;

    bankCity: string;

    bankCountryId: number;

    bankStateId: number;

    bankPincode: string;

    companyBankName: string;

    companyIFSC: string;

    companyAccountHolderName: string;

    companyAccountNumber: string;

    companyAccountBranch: string;

    companyAccountBic: string;

    companyAccountCreatedOn: string;

    companyAccountBankName: string;
}

interface Capabilitie {
    data: string;
    status: number;
}

interface VendorMedia {

    fileName: string;

    filePath: string;

    mediaType: number;

    videoType: number;

    showHomePage: number | boolean;

    status: number;

    url: string;

    defaultImage: number;

    title: string;

}

interface Personalized {
    defaultLanguage: number;
    timeFormat: string;
    timeZone: string;
    dateFormat: string;
}
