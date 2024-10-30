/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { PaymentItems } from './PaymentItems';
import { Vendor } from './Vendor';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_payment_archive')
export class VendorPaymentArchive extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;

    @Column({ name: 'vendor_order_archive' })
    public vendorOrderArchive: number;

    @Column({ name: 'payment_item_id' })
    public paymentItemId: number;
    @IsNotEmpty()
    @Column({ name: 'amount' })
    public amount: number;

    @Column({ name: 'commission_amount' })
    public commissionAmount: number;

    @ManyToOne(type => PaymentItems, paymentItems => paymentItems.vendorPaymentArchive)
    @JoinColumn({ name: 'payment_item_id' })
    public paymentItems: PaymentItems;

    @ManyToOne(type => Vendor, vendor => vendor.vendorPaymentArchive)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
