import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductRating } from './ProductRating';
import { BaseModel } from '../../core/models/BaseModel';

export enum FileType {
    IMAGE = 'image',
    VIDEO = 'video',
}

@Entity('product_rating_images')
export class ProductRatingImages extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @Column({ name: 'file_name' })
    public fileName: string;

    @Column({ name: 'file_path' })
    public filePath: string;

    @Column({ name: 'rating_id' })
    public ratingId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({
        name: 'file_type',
        type: 'enum',
        enum: FileType,
    })
    public fileType: FileType;

    @ManyToOne((type) => ProductRating, productRating => productRating.productRatingImages)
    @JoinColumn({ name: 'rating_id' })
    public productRating: ProductRating;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
