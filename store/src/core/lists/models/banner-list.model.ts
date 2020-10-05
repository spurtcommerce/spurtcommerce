/*
 * spurtcommerce
 * version 1.0
* www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class BannerListModel {
    public limit: number;
    public offset: number;
    public count: boolean;

    constructor(bannerRequest: any) {
        this.limit = bannerRequest.limit || 0;
        this.offset = bannerRequest.offset || 0;
        this.count = bannerRequest.count || false;
    }
}
