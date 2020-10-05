/*
 * spurtcommerce
 * version 1.0
* www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class BannerListResponseModel {
    public bannerId: string;
    public title: string;
    public url: string;
    public link: string;
    public content: string;
    public position: string;
    public image: string;
    public imagePath: string;
    public containerName: string;
    public viewPageCount: number;
    public isActive: number;

    constructor(bannerResponse: any) {
        this.bannerId = bannerResponse.bannerId || '';
        this.title = bannerResponse.title || '';
        this.url = bannerResponse.url || '';
        this.link = bannerResponse.link || '';
        this.content = bannerResponse.content || '';
        this.position = bannerResponse.position || '';
        this.image = bannerResponse.image || '';
        this.imagePath = bannerResponse.imagePath || '';
        this.containerName = bannerResponse.containerName || '';
        this.viewPageCount = bannerResponse.viewPageCount || 0;
        this.isActive = bannerResponse.isActive || 0;
    }
}
