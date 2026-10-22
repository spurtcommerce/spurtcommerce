
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../../api/core/models/BaseModel';
import moment = require('moment');

@Entity('customer_permission_module')
export class CustomerPermissionModule extends BaseModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @Column({ name: 'slug_name', type: 'varchar', length: 255 })
    public slugName: string;

    @Column({ name: 'sort_order', type: 'int', nullable: true })
    public sortOrder: number;

    @Column({ name: 'module_group_id', type: 'int', nullable: true })
    public moduleGroupId: number;

    @Column({ name: 'is_listed', type: 'tinyint', default: 0 })
    public isListed: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
