
import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suggestion_keyword')
export class SuggestionKeyword {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'keyword' })
    public keyword: string;

    @Column({ name: 'category_id' })
    public categoryId: number;
}
