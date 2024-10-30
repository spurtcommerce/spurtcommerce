/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './CategoryModel';
import { Vendor } from './Vendor';
@Entity('vendor_category')
export class VendorCategory {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_category_id' })
    public vendorCategoryId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;

    @Column({ name: 'vendor_category_commission' })
    public vendorCategoryCommission: number;

    @ManyToOne(type => Category, category => category.vendorCategory)
    @JoinColumn({ name: 'category_id' })
    public category: Category;

    @ManyToOne(type => Vendor, vendor => vendor.vendorcategory)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

}
