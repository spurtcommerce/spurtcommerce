import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../../../../src/api/core/models/BaseModel';
import { Category } from '../../../../src/api/core/models/CategoryModel';

@Entity('search_suggestions')
export class SearchSuggestions extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({
        name: 'suggestions',
        type: 'text',
        nullable: true,
    })
    public suggestions: string;

    @Column({ name: 'category_id', type: 'int' })
    public categoryId: number;

    @Column({ name: 'count', type: 'int', default: 0 })
    public count: number;

    @Column({
        name: 'status',
        type: 'int',
        default: 0,
    })
    public status: number;

    @ManyToOne(() => Category, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'category_id' })
    public category: Category;

}
