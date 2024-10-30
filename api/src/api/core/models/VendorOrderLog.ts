/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Vendor } from './Vendor';
import { Order } from './Order';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_orders_log')
export class VendorOrderLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_order_log_id' })
    public vendorOrderLogId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;

    @Column({ name: 'sub_order_id' })
    public subOrderId: string;
    @IsNotEmpty()
    @Column({ name: 'sub_order_status_id' })
    public subOrderStatusId: number;
    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendororderlog)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => Order, order => order.vendororderlog)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
