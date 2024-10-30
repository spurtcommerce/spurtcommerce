/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { BannerImage } from './BannerImage';

@Entity('banner')
export class Banner extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'banner_id' })
    public bannerId: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'url' })
    public url: string;

    @Column({ name: 'link' })
    public link: string;

    @Column({ name: 'content' })
    public content: string;

    @Column({ name: 'position' })
    public position: string;

    @Column({ name: 'banner_group_id' })
    public bannerGroupId: number;

    @IsNotEmpty()
    @Column({ name: 'container_name' })
    public containerName: string;

    @Column({ name: 'view_page_count' })
    public viewPageCount: number;
    @IsNotEmpty()
    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'link_type' })
    public linkType: number;

    @OneToMany((type) => BannerImage, bannerImg => bannerImg.banners, { cascade: true })
    public bannerImages: BannerImage[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
