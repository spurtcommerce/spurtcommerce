/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { BaseModel } from './BaseModel';

@Entity('export_log')
export class ExportLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'module' })
    public module: string;

    @IsNotEmpty()
    @Column({ name: 'record_available' })
    public recordAvailable: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'reference_type' })
    public referenceType: number;

    @Column({ name: 'record_ids', type: 'text', nullable: true })
    public recordIds: string;

    @Column({ name: 'title', nullable: true })
    public title: string;

    @Column({ name: 'product_type', type: 'int', nullable: true })
    public productType: number;

    @Column({ name: 'export_id', nullable: true })
    public exportId: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
