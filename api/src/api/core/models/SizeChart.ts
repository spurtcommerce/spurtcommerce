/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { SizeChartTemplate } from './SizeChartTemplate';
import moment = require('moment/moment');
import { SizeChartHeader } from './SizeChartHeader';
import { IsNotEmpty } from 'class-validator';
@Entity('size_chart')
export class SizeChart extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;
    @IsNotEmpty()
    @Column({ name: 'template_id' })
    public templateId: number;

    @ManyToOne(type => SizeChartTemplate, sizeChartTemplate => sizeChartTemplate.sizeChart)
    @JoinColumn({ name: 'template_id' })
    public sizeChartTemplate: SizeChartTemplate[];

    @OneToMany(type => SizeChartHeader, sizeChartHeader => sizeChartHeader.sizeChart)
    public sizeChartHeader: SizeChartHeader[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
