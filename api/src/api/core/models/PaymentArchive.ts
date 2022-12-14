/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { PaymentItemsArchive } from './PaymentItemsArchive';
import { Order } from './Order';
import moment = require('moment');
@Entity('payment_archive')
export class PaymentArchive extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'payment_archive_id' })
    public paymentArchiveId: number;

    @Column({ name: 'order_id' })
    public orderId: number;

    @Column({ name: 'paid_date' })
    public paidDate: string;

    @Column({ name: 'payment_number' })
    public paymentNumber: number;

    @Column({ name: 'payment_information' })
    public paymentInformation: string;

    @Column({ name: 'payment_amount' })
    public paymentAmount: number;

    @Column({ name: 'payment_commission_amount' })
    public paymentCommissionAmount: number;

    @OneToMany(type => PaymentItemsArchive, paymentItemsArchive => paymentItemsArchive.paymentArchive)
    public paymentItemsArchive: PaymentItemsArchive[];

    @OneToOne(type => Order)
    @JoinColumn({ name: 'order_id' })
    public orderDetail: Order;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
