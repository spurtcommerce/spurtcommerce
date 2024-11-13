/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class GeneralSettingForm {
  public storeName: string;
  public storeOwner: string;
  public storeAddress: string;
  public storeEmail: string;
  public storeTelephone: string;
  public countryId: number;
  public zoneId: number;
  public storeLanguageName: string;
  public storeCurrencyId: number;
  public storeLogo: string;
  public maintenanceMode: number;
  public emailLogo: string;
  public invoiceLogo: string;
  public siteUrl: string;
  public settingId: number;


  constructor(generalsettingForm: any) {
    this.storeName = generalsettingForm.storename || '';
    this.storeOwner = generalsettingForm.storeowner || '';
    this.storeAddress = generalsettingForm.address || '';
    this.storeEmail = generalsettingForm.email || '';
    this.storeTelephone = generalsettingForm.phonenumber || '';
    this.countryId = generalsettingForm.country || 0;
    this.zoneId = generalsettingForm.zone || 0;
    this.storeLanguageName = generalsettingForm.language || '';
    this.storeCurrencyId = generalsettingForm.currency || 0;
    this.maintenanceMode = generalsettingForm.maintenanceMode || 0;
    this.settingId = generalsettingForm.settingId
    this.siteUrl = generalsettingForm.siteUrl || '';
    if (generalsettingForm.image) {
      this.storeLogo = generalsettingForm.image || '';
    }
    if (generalsettingForm.mailImage) {
      this.emailLogo = generalsettingForm.mailImage || '';
    }
    if (generalsettingForm.invoiceLogo) {
      this.invoiceLogo = generalsettingForm.invoiceLogo || ''; 4
    }
  }
}
