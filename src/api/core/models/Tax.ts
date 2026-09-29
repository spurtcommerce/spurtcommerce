/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { VendorTax } from './VendorTax';

@Entity('tax')
export class Tax extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'tax_id' })
    public taxId: number;

    @IsNotEmpty()
    @Column({ name: 'tax_name' })
    public taxName: string;

    @Column({ name: 'tax_percentage' })
    public taxPercentage: number;

    @IsNotEmpty()
    @Column({ name: 'tax_status' })
    public taxStatus: number;

    @OneToMany(type => VendorTax, vendorTax => vendorTax.tax)
    public vendorTax: VendorTax;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
