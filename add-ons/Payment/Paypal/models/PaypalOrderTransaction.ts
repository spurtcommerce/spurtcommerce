/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from '../../../../src/api/core/models/BaseModel';
import moment = require('moment');
@Entity('paypal_order_transaction')
export class PaypalOrderTransaction extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'paypal_order_transaction_id' })
    public id: number;

    @Column({ name: 'paypal_order_id' })
    public paypalOrderId: number;

    @Column({ name: 'payment_type' })
    public paymentType: string;

    @Column({ name: 'payment_data' })
    public paymentData: string;

    @Column({ name: 'payment_status' })
    public paymentStatus: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
