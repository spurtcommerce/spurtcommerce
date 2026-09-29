/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IsNotEmpty } from 'class-validator';
import moment = require('moment');

@Entity('payment_rule')
export class PaymentRule extends BaseModel {

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

    @Column({ name: 'instructions', nullable: true })
    public instructions: string;

    @Column({ name: 'created_by', nullable: true })
    public createdBy: number;

    @Column({ name: 'modified_by', nullable: true })
    public modifiedBy: number;

    @IsNotEmpty()
    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @IsNotEmpty()
    @Column({ name: 'payment_method_id' })
    public paymentMethodId: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
