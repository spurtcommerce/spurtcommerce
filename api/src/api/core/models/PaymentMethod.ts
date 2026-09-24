/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { PaymentRule } from './PaymentRule';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('payment_method')
export class PaymentMethod extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'slug' })
    public slug: string;

    @Column({ name: 'sort_order', type: 'int', default: 0 })
    public sortOrder: number;

    @Column({ name: 'is_active', type: 'tinyint', default: () => 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: () => 0 })
    public isDelete: number;

    @OneToMany(type => PaymentRule, paymentRule => paymentRule.paymentMethod)
    public paymentRule: PaymentRule;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
