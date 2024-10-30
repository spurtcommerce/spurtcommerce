/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Page } from './Page';
import { PageGroupTranslation } from './PageGroupTranslation';
import { Exclude } from 'class-transformer';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';
@Entity('page_group')
export class PageGroup extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'group_id' })
    public groupId: number;
    @IsNotEmpty()
    @Column({ name: 'group_name' })
    public groupName: string;
    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => Page, page => page.pageGroup)
    public page: Page[];

    @OneToMany(type => PageGroupTranslation, pageGroupTranslation => pageGroupTranslation.pageGroup)
    public pageGroupTranslation: PageGroupTranslation[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
