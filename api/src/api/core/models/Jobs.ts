/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('jobs')
export class Jobs extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'job_id' })
    public jobId: number;
    @IsNotEmpty()
    @Column({ name: 'job_title' })
    public jobTitle: string;

    @Column({ name: 'job_description' })
    public jobDescription: string;

    @Column({ name: 'salary_type' })
    public salaryType: string;

    @Column({ name: 'job_location' })
    public jobLocation: string;
    @IsNotEmpty()
    @Column({ name: 'contact_person_name' })
    public contactPersonName: string;
    @IsNotEmpty()
    @Column({ name: 'contact_person_email' })
    public contactPersonEmail: string;
    @IsNotEmpty()
    @Column({ name: 'contact_person_mobile' })
    public contactPersonMobile: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
