/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { EmailTemplate } from './EmailTemplate';

@Entity('vendor_email_template')
export class VendorEmailTemplate extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @IsNotEmpty()
    @Column({ name: 'email_template_id' })
    public emailTemplateId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'is_default' })
    public isDefault: number;

    @ManyToOne(type => EmailTemplate, emailTemplate => emailTemplate.vendorEmailTemplate)
    @JoinColumn({ name: 'email_template_id' })
    public emailTemplate: EmailTemplate;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
