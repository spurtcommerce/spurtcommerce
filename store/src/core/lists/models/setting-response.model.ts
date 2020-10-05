/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class SettingResponseModel {
  public countryId: string;
  public createdBy: string;
  public createdDate: string;
  public facebook: string;
  public google: string;
  public instagram: string;
  public isActive: string;
  public maintenanceMode: number;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public modifiedBy: string;
  public modifiedDate: string;
  public orderStatus: string;
  public settingsId: string;
  public storeAddress: string;
  public storeEmail: string;
  public storeFax: string;
  public storeImage: string;
  public storeImagePath: string;
  public storeLogo: string;
  public storeLogoPath: string;
  public storeName: string;
  public storeOwner: string;
  public storeTelephone: string;
  public twitter: string;
  public url: string;
  public zoneId: string;


  constructor(detailResponse: any) {
    this.instagram = detailResponse.instagram || '';
    this.isActive = detailResponse.isActive || '';
    this.maintenanceMode = detailResponse.maintenanceMode || 0;
    this.metaTagDescription = detailResponse.metaTagDescription || '';
    this.metaTagKeyword = detailResponse.metaTagKeyword || '';
    this.metaTagTitle = detailResponse.metaTagTitle || '';
    this.modifiedBy = detailResponse.modifiedBy || '';
    this.modifiedDate = detailResponse.modifiedDate || '';
    this.orderStatus = detailResponse.orderStatus || '';
    this.settingsId = detailResponse.settingsId || '';
    this.storeAddress = detailResponse.storeAddress || '';
    this.storeEmail = detailResponse.storeEmail || '';
    this.storeFax = detailResponse.storeFax || '';
    this.storeImage = detailResponse.storeImage || '';
    this.storeImagePath = detailResponse.storeImagePath || '';
    this.storeLogo = detailResponse.storeLogo || '';
    this.storeLogoPath = detailResponse.storeLogoPath || '';
    this.storeName = detailResponse.storeName || '';
    this.storeOwner = detailResponse.storeOwner || '';
    this.storeTelephone = detailResponse.storeTelephone || '';
    this.twitter = detailResponse.twitter || '';
    this.url = detailResponse.url || '';
    this.zoneId = detailResponse.zoneId || '';
    this.countryId = detailResponse.countryId || '';
    this.createdBy = detailResponse.createdBy || '';
    this.createdDate = detailResponse.createdDate || '';
    this.metaTagKeyword = detailResponse.metaTagKeyword || '';
    this.metaTagTitle = detailResponse.metaTagTitle || '';
    this.facebook = detailResponse.facebook || '';
    this.google = detailResponse.google || '';
  }
}
