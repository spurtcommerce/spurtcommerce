/*
 * Spurtcommerce PRO
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '../../../src/api/core/models/BaseModel';
import { Widget } from './Widget';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('widget_item')
export class WidgetItem extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'widget_id' })
    public widgetId: number;
    @IsNotEmpty()
    @Column({ name: 'ref_id' })
    public refId: number;

    @ManyToOne(type => Widget, widget => widget.widgetItem)
    @JoinColumn({ name: 'widget_id' })
    public widget: Widget;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
