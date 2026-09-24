import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VendorDocument } from './VendorDocument';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('document')
export class Document extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'document_type' })
    public documentType: string;

    @Column({ name: 'is_mandatory' })
    public isMandatory: number;

    @Column({ name: 'max_upload_size' })
    public maxUploadSize: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @OneToMany(type => VendorDocument, vendorDocument => vendorDocument.document)
    public vendorDocument: VendorDocument[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
