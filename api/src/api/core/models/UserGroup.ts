/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './User';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('user_group')
export class UserGroup extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'group_id' })
    public groupId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'slug' })
    public slug: string;

    @Exclude()
    @Column({ name: 'permission' })
    public permission: string;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => User, user => user.usergroup)
    public users: User[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
