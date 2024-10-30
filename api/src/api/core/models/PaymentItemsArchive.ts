/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { PaymentArchive } from './PaymentArchive';
import { OrderProduct } from './OrderProduct';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('payment_items_archive')
export class PaymentItemsArchive extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'payment_item_archive_id' })
    public paymentItemArchiveId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;

    @Column({ name: 'payment_archive_id' })
    public paymentArchiveId: number;
    @IsNotEmpty()
    @Column({ name: 'total_amount' })
    public totalAmount: number;

    @Column({ name: 'product_name' })
    public productName: string;

    @Column({ name: 'product_quantity' })
    public productQuantity: number;

    @Column({ name: 'product_price' })
    public productPrice: number;

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.paymentItemsArchive)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => PaymentArchive, paymentArchive => paymentArchive.paymentItemsArchive)
    @JoinColumn({ name: 'payment_archive_id' })
    public paymentArchive: PaymentArchive;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
