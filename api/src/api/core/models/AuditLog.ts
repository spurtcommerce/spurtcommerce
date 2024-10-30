import {Column, Entity, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn} from 'typeorm';
import moment from 'moment';
import { BaseModel } from './BaseModel';
import { User } from './User';

@Entity('audit_log')
export class AuditLog extends BaseModel {

    @PrimaryGeneratedColumn({name: 'id'})
    public auditLogId: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'user_name' })
    public userName: string;

    @Column({ name: 'method' })
    public method: string;

    @Column({ name: 'request_url' })
    public requestUrl: string;

    @Column({ name: 'object' })
    public object: string;

    @Column({ name: 'log_type' })
    public logType: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'params' })
    public params: string;

    @Column({ name: 'browser_info' })
    public browserInfo: string;

    @Column({name: 'module'})
    public module: string;

    @ManyToOne(type => User, user => user.auditLog)
    @JoinColumn({ name: 'user_id' })
    public user: User[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
