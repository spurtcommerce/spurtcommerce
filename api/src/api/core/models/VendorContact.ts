/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { Vendor } from './Vendor';

@Entity('vendor_contact')
export class VendorContact extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;
    @IsNotEmpty()
    @Column({ name: 'phone_number' })
    public mobileNumber: number;
    @IsNotEmpty()
    @Column({ name: 'country' })
    public country: string;

    @Column({ name: 'requirement' })
    public requirement: string;
    @ManyToOne(type => Vendor, vendor => vendor.vendorContact)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
