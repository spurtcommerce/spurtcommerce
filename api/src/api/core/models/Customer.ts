/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import * as bcrypt from 'bcrypt';
import moment = require('moment/moment');
import { Exclude } from 'class-transformer';
import { CustomerGroup } from './CustomerGroup';
import { Order } from './Order';
import { Vendor } from './Vendor';
import { Country } from './Country';
import { IsNotEmpty } from 'class-validator';
import { ProductViewLog } from './productViewLog';
import { CustomerCart } from './CustomerCart';
import { ExportLog } from './ExportLog';

@Entity('customer')
export class Customer extends BaseModel {
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

    public static comparePassword(user: Customer, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'gender' })
    public gender: string;

    @Column({ name: 'dob' })
    public dob: string;

    @IsNotEmpty()
    @Column({ name: 'username' })
    public username: string;
    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'password' })
    public password: string;
    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'mobile' })
    public mobileNumber: number;

    @Column({ name: 'address' })
    public address: string;

    @Column({ name: 'country_id' })
    public countryId: number;

    @Column({ name: 'zone_id' })
    public zoneId: number;

    @Column({ name: 'city' })
    public city: string;

    @Column({ name: 'local' })
    public local: string;

    @Column({ name: 'oauth_data' })
    public oauthData: string;

    @Column({ name: 'avatar' })
    public avatar: string;
    @Exclude()
    @Column({ name: 'newsletter' })
    public newsletter: string;

    @Column({ name: 'avatar_path' })
    public avatarPath: string;
    @Exclude()
    @Column({ name: 'customer_group_id' })
    public customerGroupId: number;

    @Column({ name: 'last_login' })
    public lastLogin: string;
    @Exclude()
    @Column({ name: 'safe' })
    public safe: number;
    @Exclude()
    @Column({ name: 'ip' })
    public ip: number;
    @Exclude()
    @Column({ name: 'mail_status' })
    public mailStatus: number;
    @Column({ name: 'pincode' })
    public pincode: string;
    @Exclude()
    @Column({ name: 'delete_flag' })
    public deleteFlag: number;
    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;
    @Exclude()
    @Column({ name: 'forget_password_key' })
    public forgetPasswordKey: string;

    @Column({ name: 'forget_password_link_expires' })
    public linkExpires: string;

    @Column({ name: 'locked_on' })
    public lockedOn: string;

    @Column({ name: 'site_id' })
    public siteId: number;

    @Column({ name: 'address2' })
    public address2: number;

    @Column({ name: 'landmark' })
    public landmark: string;

    @Column({ name: 'mail_otp' })
    public mailOtp: number;

    @Column({ name: 'mail_otp_expire_time' })
    public mailOtpExpireTime: string;

    @ManyToOne(type => CustomerGroup, customergroup => customergroup.customer)
    @JoinColumn({ name: 'customer_group_id' })
    public customerGroup: CustomerGroup;

    @ManyToOne(type => Country, country => country.customer)
    @JoinColumn({ name: 'country_id' })
    public country: Country;

    @OneToMany(type => Order, order => order.customer)
    public order: Order[];

    @OneToOne(type => ExportLog, exportLog => exportLog.user)
    public exportLog: ExportLog;

    @OneToMany(type => ProductViewLog, productviewlog => productviewlog.customer)
    public productviewlog: ProductViewLog[];

    @OneToMany(type => CustomerCart, customerCart => customerCart.customer)
    public customerCart: CustomerCart[];

    @OneToOne(type => Vendor)
    public vendor: Vendor;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
