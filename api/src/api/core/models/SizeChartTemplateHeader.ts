/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { HeaderText } from './HeaderTextModel';
import { SizeChartTemplate } from './SizeChartTemplate';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
@Entity('size_chart_template_header')
export class SizeChartTemplateHeader extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'template_id' })
    public templateId: number;
    @IsNotEmpty()
    @Column({ name: 'header_id' })
    public headerId: number;
    @IsNotEmpty()
    @Column({ name: 'header_text' })
    public headerText: string;

    @ManyToOne(type => HeaderText, headerText => headerText.templateHeader)
    @JoinColumn({ name: 'header_id' })
    public header: HeaderText;

    @ManyToOne(type => SizeChartTemplate, sizeChartTemplate => sizeChartTemplate.templateHeader)
    @JoinColumn({ name: 'template_id' })
    public sizeChartTemplate: SizeChartTemplate;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
