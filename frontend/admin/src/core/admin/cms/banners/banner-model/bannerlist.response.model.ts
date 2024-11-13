/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BannerlistResponseModel {
  public bannerId: number;
  public position: number;
  public content: string;
  public image: string;
  public imagePath: string;
  public link: string;
  public title: string;
  public active: any;
  public linkType: number;
  public bannerImages:any[] = [];
  public modifiedDate:string
   public createdDate :string
  constructor(bannerlistResponse: any) {
    this.bannerId = bannerlistResponse.bannerId || 0;
    this.position = bannerlistResponse.position || 0;
    this.content = bannerlistResponse.content || '';
    this.image = bannerlistResponse.image || '';
    this.imagePath = bannerlistResponse.imagePath || '';
    this.link = bannerlistResponse.link || '';
    this.linkType = bannerlistResponse.linkType || '';
    this.title = bannerlistResponse.title || '';
    this.active = bannerlistResponse.isActive;
    this.bannerImages = bannerlistResponse.bannerImages || []
    this.modifiedDate = bannerlistResponse.modifiedDate || '';
    this.createdDate = bannerlistResponse.createdDate || '';
  }
}
