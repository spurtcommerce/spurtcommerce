/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { OrderProduct } from './OrderProduct';
import { VendorInvoice } from './VendorInvoice';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_invoice_item')
export class VendorInvoiceItem extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_invoice_item_id' })
    public vendorInvoiceItemId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_invoice_id' })
    public vendorInvoiceId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;

    @OneToOne(type => OrderProduct)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => VendorInvoice, vendorInvoice => vendorInvoice.vendorInvoiceItem)
    @JoinColumn({ name: 'vendor_invoice_id' })
    public vendorInvoice: VendorInvoice;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
