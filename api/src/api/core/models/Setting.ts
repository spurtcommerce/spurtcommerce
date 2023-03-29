/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
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

    @Column({ name: 'url' })
    public url: string;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keywords' })
    public metaTagKeyword: string;
    @IsNotEmpty()
    @Column({ name: 'store_name' })
    public storeName: string;

    @Column({ name: 'store_owner' })
    public storeOwner: string;

    @Column({ name: 'store_address' })
    public storeAddress: string;

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

    @Column({ name: 'store_currency_id' })
    public storeCurrencyId: number;

    @Column({ name: 'store_image' })
    public storeImage: string;

    @Column({ name: 'store_image_path' })
    public storeImagePath: string;

    @Column({ name: 'facebook' })
    public facebook: string;

    @Column({ name: 'google' })
    public google: string;

    @Column({ name: 'twitter' })
    public twitter: string;

    @Column({ name: 'instagram' })
    public instagram: string;

    @Column({ name: 'invoice_prefix' })
    public invoicePrefix: string;

    @Column({ name: 'category_product_count' })
    public categoryProductCount: number;

    @Column({ name: 'items_per_page' })
    public itemsPerPage: number;

    @Column({ name: 'is_active' })
    public isActive: string;

    @Column({ name: 'addons' })
    public addons: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
