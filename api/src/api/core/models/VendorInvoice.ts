/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Vendor } from './Vendor';
import { Order } from './Order';
import { VendorInvoiceItem } from './VendorInvoiceItem';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_invoice')
export class VendorInvoice extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_invoice_id' })
    public vendorInvoiceId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'invoice_no' })
    public invoiceNo: string;

    @Column({ name: 'invoice_prefix' })
    public invoicePrefix: string;

    @Column({ name: 'total' })
    public total: string;
    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'shipping_firstname' })
    public shippingFirstname: string;

    @Column({ name: 'shipping_lastname' })
    public shippingLastname: string;

    @ManyToOne(type => Order, order => order.vendorInvoice)
    @JoinColumn({ name: 'order_id' })
    public orderDetail: Order;

    @OneToOne(type => Vendor)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @OneToMany(type => VendorInvoiceItem, vendorInvoiceItem => vendorInvoiceItem.vendorInvoice)
    public vendorInvoiceItem: VendorInvoiceItem[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
