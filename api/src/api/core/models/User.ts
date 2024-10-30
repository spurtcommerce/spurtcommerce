/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ExportLog } from './ExportLog';
import {
    BeforeInsert, Column, Entity, ManyToOne, JoinColumn, BeforeUpdate, PrimaryGeneratedColumn,
    OneToMany,
    OneToOne
} from 'typeorm';

import { UserGroup } from './UserGroup';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { AccessToken } from './AccessTokenModel';
import { AuditLog } from './AuditLog';

@Entity('users')
export class User extends BaseModel {

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

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }
    @PrimaryGeneratedColumn({ name: 'user_id' })
    @IsNotEmpty()
    public userId: number;

    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'user_group_id' })
    public userGroupId: number;
    @Exclude()
    @Column({ name: 'username' })
    public username: string;

    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'password' })
    public password: string;
    @Exclude()
    @Column({ name: 'first_name' })
    public firstName: string;
    @Exclude()
    @Column({ name: 'last_name' })
    public lastName: string;
    @Exclude()
    @IsEmail()
    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'avatar' })
    public avatar: string;

    @Column({ name: 'avatar_path' })
    public avatarPath: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'code' })
    public code: string;
    @Exclude()
    @Column({ name: 'ip' })
    public ip: string;
    @Exclude()
    @Column({ name: 'phone_number' })
    public phoneNumber: string;

    @Column({ name: 'address' })
    public address: string;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'forget_password_link_expires'})
    public linkExpires: string;
    @Exclude()
    @Column({ name: 'forget_password_key'})
    public forgetPasswordKey: string;

    @Exclude()
    @Column({ name: 'permission' })
    public permission: string;

    @ManyToOne(type => UserGroup, usergroup => usergroup.users)
    @JoinColumn({ name: 'user_group_id' })
    public usergroup: UserGroup;

    @OneToMany(type => AccessToken, accessToken => accessToken.user)
    public accessToken: AccessToken[];

    @OneToMany(type => AuditLog, auditLog => auditLog.user)
    public auditLog: AuditLog[];

    @OneToOne(type => ExportLog, exportLog => exportLog.user)
    public exportLog: ExportLog;

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
