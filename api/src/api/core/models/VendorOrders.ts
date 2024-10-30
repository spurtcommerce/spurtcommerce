/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Vendor } from './Vendor';
import { Order } from './Order';
import { OrderStatus } from './OrderStatus';
import { VendorOrderProducts } from './VendorOrderProducts';
import { OrderProduct } from './OrderProduct';
import { VendorPayment } from './VendorPayment';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_orders')
export class VendorOrders extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_order_id' })
    public vendorOrderId: number;

    @Column({ name: 'sub_order_id' })
    public subOrderId: string;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'sub_order_status_id' })
    public subOrderStatusId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'commission' })
    public commission: number;

    @Column({ name: 'tracking_url' })
    public trackingUrl: string;

    @Column({ name: 'tracking_no' })
    public trackingNo: string;

    @Column({ name: 'make_settlement' })
    public makeSettlement: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendororder)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.vendorOrders)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => OrderStatus, orderStatus => orderStatus.vendorOrders)
    @JoinColumn({ name: 'sub_order_status_id' })
    public orderStatus: OrderStatus[];

    @ManyToOne(type => Order, order => order.vendorOrders)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @OneToOne(type => Order)
    @JoinColumn({ name: 'order_id' })
    public orderDetail: Order;

    @OneToOne(type => OrderProduct)
    @JoinColumn({ name: 'order_product_id' })
    public orderProductDetail: OrderProduct;

    @OneToMany(type => VendorOrderProducts, vendorOrderProducts => vendorOrderProducts.vendororder)
    public vendororderproducts: VendorOrderProducts[];

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendorOrders)
    public vendorPayment: VendorPayment[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
