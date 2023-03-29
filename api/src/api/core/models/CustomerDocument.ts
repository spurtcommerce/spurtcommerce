/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Customer } from './Customer';
import { IsNotEmpty } from 'class-validator';

@Entity('customer_document')
export class CustomerDocument extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'customer_document_id' })
    public customerDocumentId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'path' })
    public path: string;

    @Column({ name: 'document_status' })
    public documentStatus: number;

    @ManyToOne(type => Customer, customer => customer.customerDocument)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
