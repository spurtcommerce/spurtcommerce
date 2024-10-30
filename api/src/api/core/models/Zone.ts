/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Exclude } from 'class-transformer';
import { Country } from './Country';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { Address } from './Address';

@Entity('zone')
export class Zone extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'zone_id' })
    public zoneId: number;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'country_id' })
    public countryId: number;

    @Column({ name: 'code' })
    public code: string;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Country, country => country.zone)
    @JoinColumn({ name: 'country_id' })
    public country: Country;

    @OneToMany(type => Address, address => address.zone)
    public address: Address;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
