import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Banner } from './Banner';
import { BaseModel } from './BaseModel';

@Entity('banner_images')
export class BannerImage extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @Column({ name: 'image_name' })
    public imageName: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

    @Column({ name: 'is_primary' })
    public isPrimary: number;

    @Column({ name: 'banner_id' })
    public bannerId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => Banner, banner => banner.bannerImages)
    @JoinColumn({ name: 'banner_id' })
    public banners: Banner;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
