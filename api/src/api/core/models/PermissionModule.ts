/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('permission_module')
export class PermissionModule extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'module_id' })
    public moduleId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;
    @IsNotEmpty()
    @Column({ name: 'slug_name' })
    public slugName: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;
    @IsNotEmpty()
    @Column({ name: 'module_group_id' })
    public moduleGroupId: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
