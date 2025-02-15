import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from '../../../../src/api/core/models/BaseModel';
import moment = require('moment/moment');
import { SiteFilterCategory } from './SiteFilterCategory';
import { SiteFilterSection } from './SiteFilterSection';
import { IsNotEmpty } from 'class-validator';

@Entity('site_filter')
export class SiteFilter extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'filter_name' })
    public filterName: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => SiteFilterCategory, filterCategory => filterCategory.filterDetail)
    public filterCategory: SiteFilterCategory[];

    @OneToMany(type => SiteFilterSection, filterSection => filterSection.filterDetail)
    public filterSection: SiteFilterSection[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
