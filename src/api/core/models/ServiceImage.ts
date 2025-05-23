/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('service_image')
export class ServiceImage extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'service_image_id' })
    @IsNotEmpty()
    public serviceImageId: number;
    @IsNotEmpty()
    @Column({ name: 'service_id' })
    public serviceId: number;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'container_name' })
    public containerName: string;

    @Exclude()
    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'default_image' })
    public defaultImage: number;
    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
