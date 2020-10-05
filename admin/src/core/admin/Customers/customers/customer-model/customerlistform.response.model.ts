/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomerlistformResponseForm {

    public limit: number;
    public offset: number;
    public name: string;
    public email: string;
    public customerGroup: string;
    public date: string;
    public count: string;
    public status: string;


    public address: string;
    public avatar: string;
    public avatarPath: string;
    public city: string;
    public countryId: number;
    public createdBy: string;
    public createdDate: string;
    public customerGroupId: number;
    public deleteFlag: number;
    public firstName: string;
    public id: number;
    public ip: string;
    public isActive: number;
    public lastName: string;
    public mailStatus: number;
    public mobileNumber: string;
    public modifiedBy: string;
    public modifiedDate: string;
    public newsletter: number;
    public password: string;
    public pincode: string;
    public username: string;


    constructor(customerlistresponseform: any) {
        this.customerGroup = customerlistresponseform.customerGroup || '';
        this.date = customerlistresponseform.date || '';
        this.email = customerlistresponseform.email || '';
        this.name = customerlistresponseform.name || '';
        this.limit = customerlistresponseform.limit || '';
        this.offset = customerlistresponseform.offset || '';
        this.count = customerlistresponseform.count || '';
        this.status = '';

        this.address = customerlistresponseform.address || '';
        this.avatar = customerlistresponseform.avatar || '';
        this.avatarPath = customerlistresponseform.avatarPath || '';
        this.city = customerlistresponseform.city || '';
        this.countryId = customerlistresponseform.countryId || 0;
        this.createdBy = customerlistresponseform.createdBy || '';
        this.createdDate = customerlistresponseform.createdDate || '';
        this.customerGroupId = customerlistresponseform.customerGroupId || 1;
        this.deleteFlag = customerlistresponseform.deleteFlag || 0;
        this.firstName = customerlistresponseform.firstName || '';
        this.id = customerlistresponseform.id || 0;
        this.ip = customerlistresponseform.ip || '';
        this.isActive = customerlistresponseform.isActive || 0;
        this.lastName = customerlistresponseform.lastName || '';
        this.mailStatus = customerlistresponseform.mailStatus || 0;
        this.mobileNumber = customerlistresponseform.mobileNumber || '';
        this.modifiedBy = customerlistresponseform.modifiedBy || '';
        this.modifiedDate = customerlistresponseform.modifiedDate || '';
        this.newsletter = customerlistresponseform.newsletter || 0;
        this.password = customerlistresponseform.password || '';
        this.pincode = customerlistresponseform.pincode || '';
        this.username = customerlistresponseform.username || '';


    }
}
