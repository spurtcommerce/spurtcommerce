/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('export_log')
export class ExportLog {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'module' })
    public module: string;

    @IsNotEmpty()
    @Column({ name: 'record_available' })
    public recordAvailable: number;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @Column({ name: 'reference_id' })
    public referenceId: number;

    @Column({ name: 'reference_type' })
    public referenceType: number;

    @BeforeInsert()
    public async createdDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
