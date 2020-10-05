/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import {
    BeforeInsert, Column, Entity, ManyToOne, JoinColumn, BeforeUpdate, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { UserGroup } from './UserGroup';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {AccessToken} from './AccessTokenModel';

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
        console.log(password);
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

    @Column({ name: 'username' })
    public username: string;

    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

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

    @Column({ name: 'ip' })
    public ip: string;

    @Column({ name: 'phone_number' })
    public phoneNumber: string;

    @Column({ name: 'address' })
    public address: string;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @ManyToOne(type => UserGroup, usergroup => usergroup.users)
    @JoinColumn({ name: 'user_group_id' })
    public usergroup: UserGroup;

    @OneToMany(type => AccessToken, accessToken => accessToken.user)
    public accessToken: AccessToken[];

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        // this.password = await User.hashPassword(this.password);
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
