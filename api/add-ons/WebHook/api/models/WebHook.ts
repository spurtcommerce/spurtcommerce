import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('webhook')
export class WebHook {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'slug' })
    public slug: string;

    @Column({ name: 'url' })
    public url: string;

    @Column({ name: 'is_active' })
    public isActive: number;

}
