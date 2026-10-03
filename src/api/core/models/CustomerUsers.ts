
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';
import moment = require('moment');
import * as bcrypt from 'bcrypt';
import { CustomerUserGroup } from './CustomerUserGroup';
import { Customer } from '../../core/models/Customer';
import { Exclude } from 'class-transformer';

@Entity('customer_users')
export class CustomerUsers extends BaseModel {

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

  public static comparePassword(user: CustomerUsers, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        resolve(res === true);
      });
    });
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'customer_user_group_id', type: 'int' })
  public customerUserGroupId: number;

  @Column({ name: 'username', type: 'varchar', length: 255 })
  public username: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  public password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  public firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  public lastName: string;

  @Column({ type: 'varchar', length: 55, nullable: true })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public avatar: string;

  @Column({ name: 'avatar_path', type: 'varchar', length: 255, nullable: true })
  public avatarPath: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  public code: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public ip: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public address: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 25, nullable: true })
  public phoneNumber: string;

  @Column({ name: 'is_active', type: 'tinyint', default: () => '1' })
  public isActive: number;

  @Column({ name: 'delete_flag', type: 'tinyint', default: () => '0' })
  public deleteFlag: number;

  @Column({ name: 'forget_password_link_expires', type: 'datetime', nullable: true })
  public forgetPasswordLinkExpires: string;

  @Column({ name: 'forget_password_key', type: 'varchar', length: 255, nullable: true })
  public forgetPasswordKey: string;

  @Column({ name: 'is_super_customer', type: 'tinyint', nullable: true })
  public isSuperCustomer: number;

  @Column({ name: 'customer_id', type: 'int', nullable: true })
  public customerId: number;

  @Column({ name: 'locked_on' })
  public lockedOn: string;

  @Column({ name: 'last_login' })
  public lastLogin: string;

  @Column({ name: 'mail_otp' })
  public mailOtp: number;

  @Column({ name: 'mail_otp_expire_time' })
  public mailOtpExpireTime: string;

  @Column({ name: 'oauth_data' })
  public oauthData: string;

  @Column( { name: 'basic_info' })
  public basicInfo: string;

  @Column( { name: 'password_description' })
  public passwordDescription: string;

  @ManyToOne(type => Customer, customer => customer.customerUsers)
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  @ManyToOne(type => CustomerUserGroup, customerUserGroups => customerUserGroups.customerUsers)
  @JoinColumn({ name: 'customer_user_group_id' })
  public customerUserGroups: CustomerUserGroup;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

}
