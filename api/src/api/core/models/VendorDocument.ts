/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Document } from './Document';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { VendorDocumentLog } from './VendorDocumentLog';

export enum DocumentStatus {
    Rejected = 0,
    Approved = 1,
    Pending = 2,
}
export interface AdditionalInfo {
    certificationType: string;
    refrenceNo: string;
    name: string;
    issuedBy: string;
    validFrom: string;
    validTo: string;
}

@Entity('vendor_document')
export class VendorDocument extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'document_id' })
    public documentId: number;

    @Column({ name: 'file_name' })
    public fileName: string;

    @Column({ name: 'file_path' })
    public filePath: string;

    @Column({ name: 'status' })
    public status: number;

    @Column({ name: 'is_verified' })
    public isVerified: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'additional_info', type: 'json', default: {} })
    public additionalInfo: AdditionalInfo;

    @ManyToOne(type => Document, document => document.vendorDocument)
    @JoinColumn({ name: 'document_id' })
    public document: Document;

    @OneToMany(type => VendorDocumentLog, vendorDocumentLog => vendorDocumentLog.vendorDocument)
    public vendorDocumentLog: VendorDocumentLog[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
