/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
import { Customer } from './Customer';
import { CustomerGroup } from './CustomerGroup';

@Entity('payment_term')
export class PaymentTerm extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'slug' })
    public slug: string;

    @IsNotEmpty()
    @Column({ name: 'term_days' })
    public termDays: number;

    @Column({ name: 'is_active', type: 'tinyint', default: () => 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: () => 0 })
    public isDelete: number;

    @Column({ name: 'created_by', nullable: true })
    public createdBy: number;

    @Column({ name: 'modified_by', nullable: true })
    public modifiedBy: number;

    @IsNotEmpty()
    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany(type => Customer, customer => customer.paymentTerm)
    public customer: Customer;

    @OneToMany(type => CustomerGroup, customerGroup => customerGroup.paymentTerm)
    public customerGroup: CustomerGroup;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
