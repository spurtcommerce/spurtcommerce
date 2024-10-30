/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import moment = require('moment/moment');
import { VendorDocument } from './VendorDocument';

export enum DocumentLogStatus {
    Uploaded = 1,
    ReUploaded = 2,
    Rejected = 3,
    Approved = 4,
    Deleted = 5,
}

@Entity('vendor_document_log')
export class VendorDocumentLog {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'document_id' })
    public vendorDocumentId: number;

    @Column({ name: 'status' })
    public status: number;

    @Column({ name: 'reason' })
    public reason: string;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @ManyToOne(type => VendorDocument, vendorDocument => vendorDocument.vendorDocumentLog)
    @JoinColumn({ name: 'document_id' })
    public vendorDocument: VendorDocument;

    @BeforeInsert()
    public async createdDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
