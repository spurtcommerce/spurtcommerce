
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import moment = require('moment');

export enum ApiKeyExpiryType {
    ONE_DAY = '1_day',
    SEVEN_DAYS = '7_days',
    ONE_MONTH = '1_month',
    ONE_YEAR = '1_year',
    LIFETIME = 'lifetime',
}

@Entity('api_key')
export class ApiKeyModel extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'api_key_hash', length: 64, unique: true })
    public apiKeyHash: string;

    @Column({ name: 'name', default : '' })
    public name: string;

    @Column({
    name: 'api_key_encrypted',
    type: 'text',
    nullable: true,
    })
    public apiKeyEncrypted: string;

    @Column({
        name: 'expiry_type',
        type: 'enum',
        enum: ApiKeyExpiryType,
    })
    public expiryType: ApiKeyExpiryType;

    @Column({
        name: 'expire_date',
        type: 'datetime',
        nullable: true,
    })
    public expireDate: Date | null;

    @Column({ name: 'status', type: 'tinyint', default: 1 })
    public status: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
