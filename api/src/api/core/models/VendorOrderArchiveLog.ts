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
import { VendorOrderArchive } from './VendorOrderArchive';
import { OrderStatus } from './OrderStatus';
import { OrderProduct } from './OrderProduct';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_order_archive_log')
export class VendorOrderArchiveLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_order_archive_log_id' })
    public vendorOrderArchiveLogId: number;

    @Column({ name: 'vendor_order_archive_id' })
    public vendorOrderArchiveId: number;

    @Column({ name: 'sub_order_id' })
    public subOrderId: string;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'sub_order_status_id' })
    public subOrderStatusId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;

    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'order_product_id' })
    public order_product_Id: number;

    @Column({ name: 'commission' })
    public commission: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendorOrderArchiveLog)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.vendorOrderArchive)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => OrderStatus, orderStatus => orderStatus.vendorOrderArchiveLog)
    @JoinColumn({ name: 'sub_order_status_id' })
    public orderStatus: OrderStatus[];

    @ManyToOne(type => Order, order => order.vendorOrderArchiveLog)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @ManyToOne(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendorOrderArchiveLog)
    @JoinColumn({ name: 'vendor_order_archive_id' })
    public vendorOrderArchive: VendorOrderArchive[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
