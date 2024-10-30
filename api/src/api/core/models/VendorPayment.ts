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
import { VendorOrders } from './VendorOrders';
import { PaymentItems } from './PaymentItems';
import { Vendor } from './Vendor';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_payment')
export class VendorPayment extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_payment_id' })
    public vendorPaymentId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;
    @IsNotEmpty()
    @Column({ name: 'payment_item_id' })
    public paymentItemId: number;
    @IsNotEmpty()
    @Column({ name: 'amount' })
    public amount: number;
    @IsNotEmpty()
    @Column({ name: 'commission_amount' })
    public commissionAmount: number;

    @ManyToOne(type => VendorOrders, vendorOrders => vendorOrders.vendorPayment)
    @JoinColumn({ name: 'vendor_order_id' })
    public vendorOrders: VendorOrders[];

    @ManyToOne(type => PaymentItems, paymentItems => paymentItems.vendorPayment)
    @JoinColumn({ name: 'payment_item_id' })
    public paymentItems: PaymentItems;

    @ManyToOne(type => Vendor, vendor => vendor.vendorPayment)
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
