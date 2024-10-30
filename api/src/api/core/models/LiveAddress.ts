import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');

@Entity('live_address')
export class LiveAddress extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'country_id' })
    public countryId: number;

    @Column({ name: 'zone_id' })
    public zoneId: number;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'company' })
    public company: string;
    @IsNotEmpty()
    @Column({ name: 'address_1' })
    public address1: string;

    @Column({ name: 'address_2' })
    public address2: string;

    @Column({ name: 'postcode' })
    public postcode: number;
    @IsNotEmpty()
    @Column({ name: 'city' })
    public city: string;
    @IsNotEmpty()
    @Column({ name: 'state' })
    public state: string;

    @Column({ name: 'ip' })
    public ip: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
