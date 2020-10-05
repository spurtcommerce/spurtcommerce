/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');

@Entity('page')
export class Page extends BaseModel {

    @PrimaryGeneratedColumn({name: 'page_id'})
    public pageId: number;

    @Column({name: 'title'})
    public title: string;

    @Column({name: 'intro'})
    public intro: string;

    @Column({name: 'full_text'})
    public content: string;

    @Column({name: 'page_group_id'})
    public pageGroupId: number;

    @Column({name: 'sort_order'})
    public sortOrder: number;

    @Column({name: 'meta_tag_title'})
    public metaTagTitle: string;

    @Column({name: 'meta_tag_description'})
    public metaTagContent: string;

    @Column({name: 'meta_tag_keywords'})
    public metaTagKeyword: string;

    @Column({name: 'view_page_count'})
    public viewPageCount: number;

    @Column({name: 'is_active'})
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
