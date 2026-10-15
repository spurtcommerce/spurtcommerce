/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';
import { Specification } from './Specification';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';

@Entity('specification_translation')
export class SpecificationTranslation extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'specification_id' })
    public specificationId: number;
    @IsNotEmpty()
    @Column({ name: 'language_id' })
    public languageId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @ManyToOne(type => Specification, specification => specification.specificationTranslation)
    @JoinColumn({ name: 'specification_id' })
    public specification: Specification[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
