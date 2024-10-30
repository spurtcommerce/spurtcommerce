/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { VendorPayment } from './VendorPayment';
import { VendorPaymentArchive } from './VendorPaymentArchive';
import { Payment } from './Payment';
import { OrderProduct } from './OrderProduct';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('payment_items')
export class PaymentItems extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'payment_item_id' })
    public paymentItemId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'payment_id' })
    public paymentId: number;
    @IsNotEmpty()
    @Column({ name: 'total_amount' })
    public totalAmount: number;
    @IsNotEmpty()
    @Column({ name: 'product_name' })
    public productName: string;

    @Column({ name: 'product_quantity' })
    public productQuantity: number;
    @IsNotEmpty()
    @Column({ name: 'product_price' })
    public productPrice: number;

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.paymentItems)
    public vendorPayment: VendorPayment[];

    @OneToMany(type => VendorPaymentArchive, vendorPaymentArchive => vendorPaymentArchive.paymentItems)
    public vendorPaymentArchive: VendorPaymentArchive[];

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.paymentItems)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => Payment, payment => payment.paymentItems)
    @JoinColumn({ name: 'payment_id' })
    public payment: Payment;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
