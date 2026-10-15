import moment from 'moment';
import { BaseModel } from '../../core/models/BaseModel';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Industry } from '../../../api/core/models/Industry';

@Entity('family')
export class Family extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'industry_id', nullable: true })
    public industryId: number;

    @ManyToOne(() => Industry, (industry) => industry.family, { nullable: true })
    @JoinColumn({ name: 'industry_id' })
    public industry: Industry;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
