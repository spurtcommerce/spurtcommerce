/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { Order } from './Order';
import { VendorOrders } from './VendorOrders';
import { VendorOrderArchive } from './VendorOrderArchive';
import { OrderProductLog } from './OrderProductLog';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';

@Entity('order_status')
export class OrderStatus extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_status_id' })
    public orderStatusId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'priority' })
    public priority: number;

    @Column({ name: 'parent_id' })
    public parentId: number;

    @Column({ name: 'default_status' })
    public defaultStatus: number;

    @Column({ name: 'is_admin' })
    public isAdmin: number;
    @Column({ name: 'is_vendor' })
    public isVendor: number;

    @Column({ name: 'is_buyer' })
    public isBuyer: number;

    @Column({ name: 'is_api' })
    public isApi: number;

    @OneToMany(type => Order, order => order.orderStatus)
    public statusOfOrder: Order[];

    @OneToMany(type => VendorOrders, vendorOrder => vendorOrder.orderStatus)
    public vendorOrders: VendorOrders[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.orderStatus)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.orderStatus)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @Column({ name: 'color_code' })
    public colorCode: string;

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.orderStatus)
    public orderProductLog: OrderProductLog[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
