/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseModel} from './BaseModel';
@Entity('category_path')
export class CategoryPath extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'category_path_id' })
    public categoryPathId: number;

    @Column({ name: 'category_id' })
    public categoryId: number;

    @Column({ name: 'path_id' })
    public pathId: number;

    @Column({ name: 'level' })
    public level: number;
}
