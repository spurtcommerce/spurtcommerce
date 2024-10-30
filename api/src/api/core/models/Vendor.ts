/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2number21 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Customer } from './Customer';
import { VendorProducts } from './VendorProducts';
import { VendorOrders } from './VendorOrders';
import { VendorOrderLog } from './VendorOrderLog';
import { VendorOrderArchive } from './VendorOrderArchive';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';
import { VendorPayment } from './VendorPayment';
import { VendorPaymentArchive } from './VendorPaymentArchive';
import { IsNotEmpty } from 'class-validator';
import { VendorCategory } from './VendorCategory';
import { VendorGroup } from '../models/VendorGroup';
import { VendorContact } from './VendorContact';
import { Industry } from './Industry';
import { Country } from './Country';
import { VendorMedia } from './VendorMedia';

export enum KycStatus {
    VERIFIED = 'verified',
    REJECTED = 'rejected',
    SUBMITTED = 'submitted',
    IN_REVIEW = 'in-review',
    PENDING = 'pending',
}

export interface Verification {
    policy: number;
    email: number;
    decision: number;
    category: number;
    document: number;
    storeFront: number;
    bankAccount: number;
    paymentInfo: number;
    companyDetail: number;
    deliveryMethod: number;
    subscriptionPlan: number;
    distributionPoint: number;
}

export interface Comment {
    date: string;
    comment: string;
    commentFor?: string;
}

export interface BankAccount {
    accountHolderName: string;
    accountNumber: string;
    branch: string;
    ifsc: string;
    bankName: string;
    bic: string;
    accountCreatedOn: string;
    bankAddress1: string;
    bankAddress2: string;
    bankArea: string;
    bankCity: string;
    bankCountryId: number;
    bankStateId: number;
    bankPincode: string;
}

export interface Capabilitie {
    data: string;
    status: number;
}

export interface Personalized {
    defaultLanguage: number;
    dateFormat: string;
    timeFormat: string;
    timeZone: string;
}

@Entity('vendor')
export class Vendor extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'vendor_prefix_id' })
    public vendorPrefixId: string;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'vendor_group_id' })
    public vendorGroupId: number;

    @Column({ name: 'commission' })
    public commission: number;

    @Column({ name: 'industry_id' })
    public industryId: number;

    @Column({ name: 'contact_person_name' })
    public contactPersonName: string;

    @Column({ name: 'vendor_slug_name' })
    public vendorSlugName: string;

    @Column({ name: 'designation' })
    public designation: string;

    @Column({ name: 'company_name' })
    public companyName: string;

    @Column({ name: 'company_location' })
    public companyLocation: string;

    @Column({ name: 'company_address1' })
    public companyAddress1: string;

    @Column({ name: 'company_address2' })
    public companyAddress2: string;

    @Column({ name: 'company_city' })
    public companyCity: string;

    @Column({ name: 'company_state' })
    public companyState: string;

    @Column({ name: 'zone_id' })
    public zoneId: number;

    @Column({ name: 'company_country_id' })
    public companyCountryId: number;

    @Column({ name: 'pincode' })
    public pincode: number;

    @Column({ name: 'company_description' })
    public companyDescription: string;

    @Column({ name: 'company_mobile_number' })
    public companyMobileNumber: number;

    @Column({ name: 'company_email_id' })
    public companyEmailId: string;

    @Column({ name: 'company_website' })
    public companyWebsite: string;

    @Column({ name: 'company_gst_number' })
    public companyTaxNumber: string;

    @Column({ name: 'company_pan_number' })
    public companyPanNumber: string;

    @Column({ name: 'company_logo' })
    public companyLogo: string;

    @Column({ name: 'company_logo_path' })
    public companyLogoPath: string;

    @Column({ name: 'payment_information' })
    public paymentInformation: string;

    @Column({ name: 'verification', type: 'json', default: {} })
    public verification: Verification;

    @Column({ name: 'verification_comment', type: 'json', default: {} })
    public verificationComment: Comment[];

    @Column({ name: 'verification_detail_comment', type: 'json', default: {} })
    public verificationDetailComment: Comment[];

    @Column({ name: 'bank_account', type: 'json', default: {} })
    public bankAccount: BankAccount;

    @Column({ name: 'approval_flag' })
    public approvalFlag: number;

    @Column({ name: 'approved_by' })
    public approvedBy: number;

    @Column({ name: 'approved_date' })
    public approvalDate: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'company_cover_image' })
    public companyCoverImage: string;

    @Column({ name: 'company_cover_image_path' })
    public companyCoverImagePath: string;

    @Column({ name: 'display_name_url' })
    public displayNameUrl: string;

    @Column({ name: 'instagram' })
    public instagram: string;

    @Column({ name: 'twitter' })
    public twitter: string;

    @Column({ name: 'youtube' })
    public youtube: string;

    @Column({ name: 'facebook' })
    public facebook: string;

    @Column({ name: 'whatsapp' })
    public whatsapp: string;

    @Column({ name: 'bank_name' })
    public bankName: string;

    @Column({ name: 'account_number' })
    public bankAccountNumber: number;

    @Column({ name: 'account_name' })
    public accountHolderName: string;

    @Column({ name: 'ifsc_code' })
    public ifscCode: string;

    @Column({ name: 'business_segment' })
    public businessSegment: string;

    @Column({ name: 'business_type' })
    public businessType: string;

    @Column({ name: 'mail_otp' })
    public mailOtp: number;

    @Column({ name: 'login_otp_expire_time' })
    public loginOtpExpireTime: string;

    @Column({ name: 'business_number' })
    public businessNumber: string;

    @Column({ name: 'preferred_shipping_method' })
    public preferredShippingMethod: string;

    @Column({ name: 'capabilities', type: 'json', default: {} })
    public capabilities: Capabilitie[];

    @Column({ name: 'vendor_description' })
    public vendorDescription: string;

    @Column({ name: 'is_email_verify' })
    public isEmailVerify: number;

    @Column({ name: 'personalized_settings', type: 'json', default: {} })
    public personalizedSettings: Personalized;

    @Column({
        name: 'kyc_status',
        type: 'enum',
        enum: KycStatus,
        default: 'pending',
    })
    public kycStatus: KycStatus;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @ManyToOne(type => VendorGroup, vendorGroup => vendorGroup.vendor)
    @JoinColumn({ name: 'vendor_group_id' })
    public vendorGroup: VendorGroup;

    @ManyToOne(type => Industry, industry => industry)
    @JoinColumn({ name: 'industry_id' })
    public industry: Industry;

    @ManyToOne(type => Country, country => country)
    @JoinColumn({ name: 'company_country_id' })
    public country: Country;

    @OneToMany(type => VendorProducts, vendorproducts => vendorproducts.vendor)
    public vendorProducts: VendorProducts[];
    @OneToMany(type => VendorOrders, vendororders => vendororders.vendor)
    public vendororder: VendorOrders[];

    @OneToMany(type => VendorOrderLog, vendororderlog => vendororderlog.vendor)
    public vendororderlog: VendorOrderLog[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendor)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendor)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendor)
    public vendorPayment: VendorPayment[];

    @OneToMany(type => VendorPaymentArchive, vendorPaymentArchive => vendorPaymentArchive.vendor)
    public vendorPaymentArchive: VendorPaymentArchive[];

    @OneToMany(type => VendorCategory, vendorcategory => vendorcategory.vendor)
    public vendorcategory: VendorCategory;

    @OneToMany(type => VendorContact, vendorContact => vendorContact.vendor)
    public vendorContact: VendorContact;

    @OneToMany(type => VendorMedia, vendorMedia => vendorMedia.vendor)
    public vendorMedia: VendorMedia[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
