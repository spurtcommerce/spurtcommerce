import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_keyword_mapping')
export class ProductKeywordMapping {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'keyword_id' })
    public keywordId: number;
}
