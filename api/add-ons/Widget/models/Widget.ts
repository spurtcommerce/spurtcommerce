import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from '../../../src/api/core/models/BaseModel';
import moment = require('moment/moment');
import { WidgetItem } from './WidgetItem';
import { IsNotEmpty } from 'class-validator';

@Entity('widget')
export class Widget extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'widget_id' })
    public widgetId: number;
    @IsNotEmpty()
    @Column({ name: 'widget_title' })
    public widgetTitle: string;
    @IsNotEmpty()
    @Column({ name: 'widget_link_type' })
    public widgetLinkType: number;

    @Column({ name: 'widget_description' })
    public widgetDescription: string;

    @Column({ name: 'position' })
    public position: number;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;
    @IsNotEmpty()
    @Column({ name: 'widget_slug_name' })
    public widgetSlugName: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => WidgetItem, widgetItem => widgetItem.widget)
    public widgetItem: WidgetItem[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
