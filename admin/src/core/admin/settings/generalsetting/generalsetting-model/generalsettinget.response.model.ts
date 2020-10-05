/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class GeneralsettingetResponseModel {
  public createdBy: string;
  public createdDate: string;
  public modifiedBy: string;
  public modifiedDate: string;
  public settingsId: number;
  public storeName: string;
  public storeOwner: string;
  public storeAddress: string;
  public countryId: number;
  public zoneId: number;
  public storeEmail: string;
  public storeTelephone: string;
  public storeImage: string;
  public isActive: string;
  public storeLogo: string;
  public storeLogoPath: string;
  public maintenanceMode: number;

  constructor(generalsettingresponse: any) {
    this.createdBy = generalsettingresponse.createdBy || '';
    this.createdDate = generalsettingresponse.createdDate || '';
    this.modifiedBy = generalsettingresponse.modifiedBy || '';
    this.modifiedDate = generalsettingresponse.modifiedDate || '';
    this.settingsId = generalsettingresponse.settingsId || '';
    this.storeName = generalsettingresponse.storeName || '';
    this.storeOwner = generalsettingresponse.storeOwner || '';
    this.storeAddress = generalsettingresponse.storeAddress || '';
    this.countryId = generalsettingresponse.countryId || '';
    this.zoneId = generalsettingresponse.zoneId || '';
    this.storeEmail = generalsettingresponse.storeEmail || '';
    this.storeTelephone = generalsettingresponse.storeTelephone || '';
    this.storeImage = generalsettingresponse.storeImage || '';
    this.isActive = generalsettingresponse.isActive || '';
    this.storeLogo = generalsettingresponse.storeLogo || '';
    this.storeLogoPath = generalsettingresponse.storeLogoPath || '';
    this.maintenanceMode = generalsettingresponse.maintenanceMode || 0;
  }
}
