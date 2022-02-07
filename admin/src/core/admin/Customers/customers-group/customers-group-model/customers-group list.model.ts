/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomersGroupList {
    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;
    public status: string;
    public groupId: string;
    public id: number;

    constructor(customersGroupList: any) {

      this.limit = customersGroupList.limit || '';
      this.offset = customersGroupList.offset || '';
      this.keyword = customersGroupList.keyword || '';
      this.count = customersGroupList.count || '';
      this.status = customersGroupList.status || '';
      if (customersGroupList.groupId) {
        this.id = customersGroupList.groupId || 0;
      }


    }
  }
