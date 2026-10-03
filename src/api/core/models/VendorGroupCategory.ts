import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Category } from './CategoryModel';
import { VendorGroup } from './VendorGroup';

@Entity('vendor_group_category')
export class VendorGroupCategory extends BaseModel {
    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'vendor_group_id'})
    public vendorGroupId: number;

    @Column({name: 'category_id'})
    public categoryId: number;

    @Column({name: 'is_active'})
    public isActive: number;

    @ManyToOne(type => Category, category => category.vendorGroupCategory)
    @JoinColumn({name: 'category_id'})
    public category: Category;

    @ManyToOne(type => VendorGroup, vendorGroup => vendorGroup.vendorGroupCategory)
    @JoinColumn({name: 'vendor_group_id'})
    public vendorGroup: VendorGroup;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
