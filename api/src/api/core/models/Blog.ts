/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from '../../../../src/api/core/models/BaseModel';
import moment = require('moment/moment');
import { BlogRelated } from '../models/BlogRelated';
import { IsNotEmpty } from 'class-validator';
// import { BlogTranslation } from './BlogTranslation';

@Entity('blog')
export class Blog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;
    @IsNotEmpty()
    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;
    @IsNotEmpty()
    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'blog_slug' })
    public blogSlug: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany(type => BlogRelated, blogRelated => blogRelated.blog)
    public blogRelated: BlogRelated[];

    // @OneToMany(type => BlogTranslation, blogTranslation => blogTranslation.blog)
    // public blogTranslation: BlogTranslation;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
