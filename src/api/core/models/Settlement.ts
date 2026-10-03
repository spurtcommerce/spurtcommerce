import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('settlement')
export class Settlement extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;
    @IsNotEmpty()
    @Column({ name: 'no_of_orders' })
    public noOfOrders: number;
    @IsNotEmpty()
    @Column({ name: 'total_amount' })
    public totalAmount: string;

    @Column({ name: 'currency_symbol_left' })
    public currencySymbolLeft: string;

    @Column({ name: 'currency_symbol_right' })
    public currencySymbolRight: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
