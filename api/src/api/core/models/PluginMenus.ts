/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';

@Entity('plugin_menu')
export class PluginMenu extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'parent_id' })
    public parentId: number;

    @Column({ name: 'menu_name' })
    public menuName: string;

    @Column({ name: 'path' })
    public path: string;

    @Column({ name: 'menu_module' })
    public menuModule: string;

    @Column({ name: 'icon' })
    public icon: string;

    @Column({ name: 'status' })
    public status: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
