/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { PaymentTerm } from './PaymentTerm';
import { CustomerToGroup } from './CustomerToGroup';
@Entity('customer_group')
export class CustomerGroup extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'color_code' })
    public colorCode: string;

    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'payment_term_id' })
    public paymentTermId: number;

    @OneToMany(type => Customer, customer => customer.customerGroup)
    public customer: Customer[];

    @ManyToOne(type => PaymentTerm, paymentTerm => paymentTerm.customerGroup)
    @JoinColumn({ name: 'payment_term_id' })
    public paymentTerm: PaymentTerm;

    @OneToMany(type => CustomerToGroup, customerToGroup => customerToGroup.customerGroup)
    public customerToGroup: CustomerToGroup[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
