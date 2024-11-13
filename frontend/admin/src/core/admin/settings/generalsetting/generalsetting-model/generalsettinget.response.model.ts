/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class GeneralsettingetResponseModel {
  public createdBy: string;
  public createdDate: string;
  public modifiedBy: string;
  public modifiedDate: string;
  public settingId: number;
  public storeName: string;
  public storeOwner: string;
  public storeAddress: string;
  public countryId: number;
  public zoneId: number;
  public storeEmail: string;
  public storeTelephone: string;
  public storeLanguageName: string;
  public storeImage: string;
  public isActive: string;
  public storeLogo: string;
  public storeLogoPath: string;
  public storeCurrencyId: number;
  public maintenanceMode: number;
  public emailLogo: string;
  public emailLogoPath: string;
  public invoiceLogo: string;
  public invoiceLogoPath: string;
  public siteUrl: string;

  constructor(generalsettingresponse: any) {
    this.createdBy = generalsettingresponse.createdBy || '';
    this.createdDate = generalsettingresponse.createdDate || '';
    this.modifiedBy = generalsettingresponse.modifiedBy || '';
    this.modifiedDate = generalsettingresponse.modifiedDate || '';
    this.settingId = generalsettingresponse.settingsId;
    this.storeName = generalsettingresponse.businessName || '';
    this.storeOwner = generalsettingresponse.storeOwner || '';
    this.storeAddress = generalsettingresponse.storeAddress1 || '';
    this.countryId = generalsettingresponse.countryId || '';
    this.zoneId = generalsettingresponse.zoneId || '';
    this.storeEmail = generalsettingresponse.storeEmail || '';
    this.storeTelephone = generalsettingresponse.storeTelephone || '';
    this.storeLanguageName = generalsettingresponse.storeLanguageName || '';
    this.storeImage = generalsettingresponse.storeImage || '';
    this.isActive = generalsettingresponse.isActive || '';
    this.storeCurrencyId = generalsettingresponse.storeCurrencyId || '';
    this.storeLogo = generalsettingresponse.storeLogo || '';
    this.storeLogoPath = generalsettingresponse.storeLogoPath || '';
    this.maintenanceMode = generalsettingresponse.maintenanceMode || 0;

    this.emailLogo = generalsettingresponse.emailLogo || '';
    this.emailLogoPath = generalsettingresponse.emailLogoPath || '';
    this.invoiceLogo = generalsettingresponse.invoiceLogo || '';
    this.invoiceLogoPath = generalsettingresponse.invoiceLogoPath || '';
    this.siteUrl = generalsettingresponse.siteUrl || '';
  }
}
