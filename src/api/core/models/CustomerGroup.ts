/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Customer } from './Customer';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('customer_group')
export class CustomerGroup extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public groupId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Exclude()
    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'color_code' })
    public colorCode: string;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => Customer, customer => customer.customerGroup)
    public customer: Customer[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
