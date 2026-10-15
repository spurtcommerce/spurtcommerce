import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specification_to_category')
export class SpecificationToCategory {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'specification_id' })
    public specificationId: number;

    @Column({ name: 'category_id' })
    public categoryId: number;

}
