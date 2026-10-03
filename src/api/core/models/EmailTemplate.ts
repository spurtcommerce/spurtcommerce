/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { VendorEmailTemplate } from './VendorEmailTemplate';
@Entity('email_template')
export class EmailTemplate extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public emailTemplateId: number;

    @IsNotEmpty()
    @Column({ name: 'shortname' })
    public title: string;

    @IsNotEmpty()
    @Column({ name: 'subject' })
    public subject: string;

    @IsNotEmpty()
    @Column({ name: 'message' })
    public content: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'dynamic_fields_ref' })
    public dynamicFieldsRef: string;

    @Column({ type: 'enum', enum: ['buyer', 'seller', 'fullfilled'], name: 'template_group' })
    public templateGroup: string;

    @OneToMany(type => VendorEmailTemplate, vendorEmailTemplate => vendorEmailTemplate.emailTemplate)
    public vendorEmailTemplate: VendorEmailTemplate[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
