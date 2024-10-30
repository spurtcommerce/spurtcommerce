/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Vendor } from './Vendor';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { VendorGroupCategory } from './VendorGroupCategory';

@Entity('vendor_group')
export class VendorGroup extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public groupId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Exclude()
    @Column({ name: 'description' })
    public description: string;

    @Column({name: 'vendor_group_commission'})
    public commission: number;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => Vendor, vendor => vendor.vendorGroup)
    public vendor: Vendor[];

    @OneToMany(type => VendorGroupCategory, vendorGroupCategory => vendorGroupCategory.vendorGroup)
    public vendorGroupCategory: VendorGroupCategory[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
