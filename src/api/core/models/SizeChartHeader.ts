/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { SizeChart } from './SizeChart';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
@Entity('size_chart_header')
export class SizeChartHeader extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'size_chart_id' })
    public sizeChartId: number;
    @IsNotEmpty()
    @Column({ name: 'header_text_value' })
    public headerTextValue: string;

    @ManyToOne(type => SizeChart, sizeChart => sizeChart.sizeChartHeader)
    @JoinColumn({ name: 'size_chart_id' })
    public sizeChart: SizeChart;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
