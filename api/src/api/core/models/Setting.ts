/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('settings')
export class Settings extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'settings_id' })
    @IsNotEmpty()
    public settingsId: number;

    @Column({ name: 'site_url' })
    public siteUrl: string;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keywords' })
    public metaTagKeyword: string;

    @IsNotEmpty()
    @Column({ name: 'site_name' })
    public siteName: string;

    @Column({ name: 'business_name' })
    public businessName: string;

    @Column({ name: 'store_owner' })
    public storeOwner: string;

    @Column({ name: 'store_name' })
    public storeName: string;

    @Column({ name: 'store_description' })
    public storeDescription: string;

    @Column({ name: 'access_key' })
    public accessKey: string;

    @Column({ name: 'site_category' })
    public siteCategory: string;

    @Column({ name: 'store_address1' })
    public storeAddress1: string;

    @Column({ name: 'store_address2' })
    public storeAddress2: string;

    @Column({ name: 'store_city' })
    public storeCity: string;

    @Column({ name: 'store_postal_code' })
    public storePostalCode: string;

    @Column({ name: 'country_id' })
    public countryId: number;

    @Column({ name: 'zone_id' })
    public zoneId: number;
    @IsNotEmpty()
    @Column({ name: 'order_status' })
    public orderStatus: number;
    @IsNotEmpty()
    @Column({ name: 'store_email' })
    public storeEmail: string;

    @Column({ name: 'store_telephone' })
    public storeTelephone: string;

    @Column({ name: 'store_fax' })
    public storeFax: string;

    @Column({ name: 'store_logo' })
    public storeLogo: string;

    @Column({ name: 'store_logo_path' })
    public storeLogoPath: string;

    @Column({ name: 'email_logo' })
    public emailLogo: string;

    @Column({ name: 'email_logo_path' })
    public emailLogoPath: string;

    @Column({ name: 'invoice_logo' })
    public invoiceLogo: string;

    @Column({ name: 'invoice_logo_path' })
    public invoiceLogoPath: string;

    @Column({ name: 'maintenance_mode' })
    public maintenanceMode: number;

    @Column({ name: 'store_language_name' })
    public storeLanguageName: string;

    @Column({ name: 'store_secondary_language_name' })
    public storeSecondaryLanguageName: string;

    @Column({ name: 'store_currency_id' })
    public storeCurrencyId: number;

    @Column({ name: 'currency_symbol' })
    public currencySymbol: string;

    @Column({ name: 'currency_format' })
    public currencyFormat: string;

    @Column({ name: 'store_image' })
    public storeImage: string;

    @Column({ name: 'store_image_path' })
    public storeImagePath: string;

    @Column({ name: 'date_format' })
    public dateFormat: string;

    @Column({ name: 'time_format' })
    public timeFormat: string;

    @Column({ name: 'default_country' })
    public defaultCountry: number;

    @Column({ name: 'is_guest_allowed' })
    public isGuestAllowed: number;

    @Column({ name: 'country' })
    public country: string;

    @Column({ name: 'facebook' })
    public facebook: string;

    @Column({ name: 'google' })
    public google: string;

    @Column({ name: 'twitter' })
    public twitter: string;

    @Column({ name: 'instagram' })
    public instagram: string;

    @Column({ name: 'linkedin' })
    public linkedin: string;

    @Column({ name: 'youtube' })
    public youtube: string;

    @Column({ name: 'youtube_logo' })
    public youtubeLogo: string;

    @Column({ name: 'x_logo' })
    public xLogo: string;

    @Column({ name: 'linkedin_logo' })
    public linkedinLogo: string;

    @Column({ name: 'facebook_logo' })
    public facebookLogo: string;

    @Column({ name: 'instagram_logo' })
    public instagramLogo: string;

    @Column({ name: 'social_path' })
    public socialPath: string;

    @Column({ name: 'invoice_prefix' })
    public invoicePrefix: string;

    @Column({ name: 'category_product_count' })
    public categoryProductCount: number;

    @Column({ name: 'items_per_page' })
    public itemsPerPage: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'addons' })
    public addons: string;

    @Column({ name: 'pending_status' })
    public pendingStatus: number;

    @Column({ name: 'default_website' })
    public defaultWebsite: number;

    @Column({ name: 'default_language_id' })
    public defaultLanguageId: number;

    @Column({ name: 'admin_logo' })
    public adminLogo: string;

    @Column({ name: 'admin_logo_path' })
    public adminLogoPath: string;

    @Column({ name: 'seller_logo' })
    public sellerLogo: string;

    @Column({ name: 'seller_logo_path' })
    public sellerLogoPath: string;

    @Column({ name: 'seller_logo2' })
    public sellerLogo2: string;

    @Column({ name: 'seller_logo2_path' })
    public sellerLogo2Path: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
