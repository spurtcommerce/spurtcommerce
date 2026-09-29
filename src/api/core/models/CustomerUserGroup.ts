import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { CustomerUsers } from './CustomerUsers';

@Entity('customer_user_group')
export class CustomerUserGroup extends BaseModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 64 })
    public name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    public description: string;

    @Column({ length: 64 })
    public slug: string;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ type: 'text', nullable: true })
    public permission: string;

    @Column({ type: 'enum', enum: ['predefined', 'custom'], default: 'custom', name: 'role_type' })
    public roleType: 'predefined' | 'custom';

    @Column({ name: 'tenant_id', type: 'int', nullable: true })
    public tenantId: number;

    @Column({ name: 'customer_id', type: 'int', nullable: true })
    public customerId: number;

    @OneToMany(type => CustomerUsers, customerUsers => customerUsers.customerUserGroups)
    public customerUsers: CustomerUsers[];

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
