
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('customer_permission_module_group')
export class CustomerPermissionModuleGroup extends BaseModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @Column({ name: 'slug_name', type: 'varchar', length: 255 })
    public slugName: string;

    @Column({ name: 'sort_order', type: 'int', nullable: true })
    public sortOrder: number;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    public description: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
