/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Blog } from './Blog';
import { IsNotEmpty } from 'class-validator';

@Entity('blog_related')
export class BlogRelated extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'related_id' })
    public relatedId: number;
    @IsNotEmpty()
    @Column({ name: 'blog_id' })
    public blogId: number;
    @IsNotEmpty()
    @Column({ name: 'related_blog_id' })
    public relatedBlogId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Blog, blog => blog.blogRelated)
    @JoinColumn({ name: 'blog_id' })
    public blog: Blog;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
