/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IsNotEmpty } from 'class-validator';
import moment from 'moment';

@Entity('customer_contact')
export class CustomerContact extends BaseModel {

    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'phone_number' })
    public phoneNumber: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'shipping_address_1' })
    public shippingAddress1: string;

    @Column({ name: 'shipping_address_2' })
    public shippingAddress2: string;

    @Column({ name: 'shipping_city' })
    public shippingCity: string;

    @Column({ name: 'shipping_postcode' })
    public shippingPostcode: string;

    @Column({ name: 'shipping_country_id' })
    public shippingCountryId: number;

    @Column({ name: 'shipping_zone_id' })
    public shippingZoneId: number;

    @Column({ name: 'shipping_firstname' })
    public shippingFirstName: string;

    @Column({ name: 'shipping_lastname' })
    public shippingLastName: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
