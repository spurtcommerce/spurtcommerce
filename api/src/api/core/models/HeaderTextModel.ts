/*
 * spurtcommerce API
 * version 4.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SizeChartTemplateHeader } from './SizeChartTemplateHeader';

@Entity('header_text')
export class HeaderText {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'header_text' })
    public headerText: string;

    @OneToMany(type => SizeChartTemplateHeader, sizeChartTemplateHeader => sizeChartTemplateHeader.sizeChartTemplate)
    public templateHeader: SizeChartTemplateHeader[];
}
