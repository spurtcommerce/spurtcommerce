/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Category } from './CategoryModel';
@Entity('category_path')
export class CategoryPath extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'category_path_id' })
    public categoryPathId: number;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;
    @IsNotEmpty()
    @Column({ name: 'path_id' })
    public pathId: number;

    @Column({ name: 'level' })
    public level: number;

    @ManyToOne(type => Category, category => category.category)
    @JoinColumn({ name: 'category_id' })
    public category: Category;

    @ManyToOne(type => Category, category => category.path)
    @JoinColumn({ name: 'path_id' })
    public path: Category;
}
