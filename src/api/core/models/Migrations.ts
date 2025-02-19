import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('migrations')
export class Migrations {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'timestamp' })
    public timestamp: number;

    @Column({ name: 'name' })
    public name: string;
}
