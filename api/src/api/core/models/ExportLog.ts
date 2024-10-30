/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { Customer } from './Customer';

@Entity('export_log')
export class ExportLog {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({name: 'module'})
    public module: string;

    @IsNotEmpty()
    @Column({ name: 'record_available' })
    public recordAvailable: number;

    @Column({name: 'created_date'})
    public createdDate: string;

    @Column({name: 'created_by'})
    public createdBy: number;

    @OneToOne(type => Customer, user => user.exportLog)
    @JoinColumn({ name: 'created_by' })
    public user: Customer;

    @BeforeInsert()
    public async createdDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
