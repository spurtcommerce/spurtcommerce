/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { VendorUsers } from './VendorUsers';

@Entity('vendor_user_group')
export class VendorUserGroup extends BaseModel {

    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'slug' })
    public slug: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'permission' })
    public permission: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany(type => VendorUsers, vendorUsers => vendorUsers.vendorUserGroup)
    public vendorUsers: VendorUsers[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
