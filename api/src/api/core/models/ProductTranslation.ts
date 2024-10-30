import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';

@Entity('product_translation')
export class ProductTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'meta_info', type: 'json' })
    public metaInfo: any;

    @ManyToOne((type) => Product, product => product.productTranslation)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
