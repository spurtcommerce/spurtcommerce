/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { PageGroup } from './PageGroup';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';

@Entity('page_group_translation')
export class PageGroupTranslation extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'group_name' })
    public groupName: string;
    @IsNotEmpty()
    @Column({ name: 'page_group_id' })
    public pageGroupId: number;
    @IsNotEmpty()
    @Column({ name: 'language_id' })
    public languageId: number;

    @ManyToOne(type => PageGroup, pageGroup => pageGroup.pageGroupTranslation)
    @JoinColumn({ name: 'page_group_id' })
    public pageGroup: PageGroup[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
