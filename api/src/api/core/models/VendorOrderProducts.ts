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
import { Exclude } from 'class-transformer';
import { VendorOrders } from './VendorOrders';
import { OrderProduct } from './OrderProduct';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_order_products')
export class VendorOrderProducts extends BaseModel {
    @IsNotEmpty()
    @Exclude()
    @PrimaryGeneratedColumn({ name: 'vendor_order_product_id' })
    public vendorOrderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;

    @ManyToOne(type => VendorOrders, vendorOrders => vendorOrders.vendororderproducts)
    @JoinColumn({ name: 'vendor_order_id' })
    public vendororder: VendorOrders[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.vendororderproduct)
    @JoinColumn({ name: 'order_product_id' })
    public orderproduct: OrderProduct[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
