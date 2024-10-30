/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { SizeChartTemplateHeader } from './SizeChartTemplateHeader';
import moment = require('moment/moment');
import { SizeChart } from './SizeChart';
import { IsNotEmpty } from 'class-validator';
@Entity('size_chart_template')
export class SizeChartTemplate extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'template_name' })
    public templateName: string;

    @OneToMany(type => SizeChartTemplateHeader, sizeChartTemplateHeader => sizeChartTemplateHeader.sizeChartTemplate)
    public templateHeader: SizeChartTemplateHeader[];

    @OneToMany(type => SizeChart, sizeChart => sizeChart.sizeChartTemplate)
    public sizeChart: SizeChart[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
