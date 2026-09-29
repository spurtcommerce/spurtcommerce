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
import { Vendor } from './Vendor';
import { VendorUserGroup } from './VendorUserGroup';
import * as bcrypt from 'bcrypt';

export interface VendorUserPersonalized {
    defaultLanguage: number;
    dateFormat: string;
    timeFormat: string;
    timeZone: string;
}

@Entity('vendor_users')
export class VendorUsers extends BaseModel {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: VendorUsers, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_group_id' })
    public userGroupId: number;

    @Column({ name: 'username' })
    public username: string;

    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'avatar' })
    public avatar: string;

    @Column({ name: 'avatar_path' })
    public avatarPath: string;

    @Column({ name: 'code' })
    public code: string;

    @Column({ name: 'ip' })
    public ip: string;

    @Column({ name: 'address' })
    public address: string;

    @Column({ name: 'phone_number' })
    public phoneNumber: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'forget_password_key' })
    public forgetPasswordKey: string;

    @Column({ name: 'forget_password_link_expires' })
    public linkExpires: string;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'permission' })
    public permission: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ type: 'json', name: 'personalized_settings' })
    public personalizedSettings: VendorUserPersonalized;

    @Column({ name: 'is_super_vendor' })
    public isSuperVendor: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendorUsers)
    @JoinColumn({ name: 'tenant_id' })
    public vendor: Vendor;

    @ManyToOne(type => VendorUserGroup, vendorUserGroup => vendorUserGroup.vendorUsers)
    @JoinColumn({ name: 'user_group_id' })
    public vendorUserGroup: VendorUserGroup;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
