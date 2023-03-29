/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column } from 'typeorm';
import { Exclude } from 'class-transformer';
export abstract class BaseModel {
    @Exclude()
    @Column({ name: 'created_by' })
    public createdBy: number;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @Exclude()
    @Column({ name: 'modified_by' })
    public modifiedBy: number;

    @Exclude()
    @Column({ name: 'modified_date' })
    public modifiedDate: string;
}
