/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ServiceToCategory } from './ServiceToCategory';
import { IsNotEmpty } from 'class-validator';

@Entity('service')
export class Services extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'service_id' })
    public serviceId: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'mobile' })
    public mobile: number;
    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => ServiceToCategory, serviceToCategory => serviceToCategory.service)
    public serviceToCategory: ServiceToCategory[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
