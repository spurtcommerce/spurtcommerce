/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { Order } from '../models/Order';
import moment from 'moment';
import { Product } from './ProductModel';
import { VendorOrderProducts } from './VendorOrderProducts';
import { VendorOrders } from './VendorOrders';
import { VendorOrderArchive } from './VendorOrderArchive';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';
import { OrderProductLog } from './OrderProductLog';
import { PaymentItems } from './PaymentItems';
import { PaymentItemsArchive } from './PaymentItemsArchive';
import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from './OrderStatus';
import { OrderFullfillmentStatus } from './OrderFullfillmentStatus';

@Entity('order_product')
export class OrderProduct extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @Column({ name: 'order_product_prefix_id' })
    public orderProductPrefixId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'model' })
    public model: string;

    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'product_price' })
    public productPrice: number;

    @Column({ name: 'discount_amount' })
    public discountAmount: number;

    @Column({ name: 'base_price' })
    public basePrice: number;

    @Column({ name: 'tax_type' })
    public taxType: number;

    @Column({ name: 'tax_value' })
    public taxValue: number;
    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'discounted_amount' })
    public discountedAmount: number;

    @IsNotEmpty()
    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'fullfillment_status_id' })
    public fullfillmentStatusId: number;

    @Column({ name: 'tags' })
    public tags: string;

    @Column({ name: 'tracking_url' })
    public trackingUrl: string;

    @Column({ name: 'tracking_no' })
    public trackingNo: string;

    @Column({ name: 'trace' })
    public trace: number;

    @Column({ name: 'tax' })
    public tax: number;

    @Column({ name: 'cancel_request' })
    public cancelRequest: number;

    @Column({ name: 'cancel_request_status' })
    public cancelRequestStatus: number;

    @Column({ name: 'cancel_reason' })
    public cancelReason: string;

    @Column({ name: 'cancel_reason_description' })
    public cancelReasonDescription: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @Column({ name: 'coupon_discount_amount' })
    public couponDiscountAmount: string;

    @Column({ name: 'price_group_detail_id' })
    public priceGroupDetailId: number;

    @ManyToOne(type => Product, product => product.orderProduct)
    @JoinColumn({ name: 'product_id' })
    public productInformationDetail: Product;

    @ManyToOne(type => Order, order => order.productlist)
    @JoinColumn({ name: 'order_id' })
    public product: Order;

    @ManyToOne(type => Order, order => order.orderProduct)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

    @OneToOne(type => OrderStatus)
    @JoinColumn({ name: 'order_status_id' })
    public orderStatus: OrderStatus;

    @OneToOne(type => OrderFullfillmentStatus)
    @JoinColumn({ name: 'fullfillment_status_id' })
    public orderFullfillmentStatus: OrderFullfillmentStatus;

    @OneToMany(type => VendorOrderProducts, vendorOrderProducts => vendorOrderProducts.orderproduct)
    public vendororderproduct: VendorOrderProducts[];

    @OneToMany(type => VendorOrders, vendorOrders => vendorOrders.orderProduct)
    public vendorOrders: VendorOrders[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.orderProduct)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.orderProduct)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.orderProduct)
    public orderProductLog: OrderProductLog[];

    @OneToMany(type => PaymentItems, paymentItems => paymentItems.orderProduct)
    public paymentItems: PaymentItems[];

    @OneToMany(type => PaymentItemsArchive, paymentItemsArchive => paymentItemsArchive.orderProduct)
    public paymentItemsArchive: PaymentItemsArchive[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
