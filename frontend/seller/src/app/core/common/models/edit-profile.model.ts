/*
 * spurtcommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class EditProfileModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public mobileNumber: string;
  public companyAddress1: string;
  public companyAddress2: string;
  public companyCity: string;
  public companyCountryId: number;
  public companyGstNumber: number;
  public companyLogo: string;
  public companyLogoPath: string;
  public companyEmailId: string;
  public companyName: string;
  public displayNameUrl: string;
  public companyPanNumber: string;
  public companyState: string;
  public companyMobileNumber: any;
  public companyWebsite: string;
  public countryName: string;
  public paymentInformation: any;
  public pincode: any;
  public avatar: any;
  public reset: number;
  public companyCoverImage: any;
  public companyBankName :any;
  public companyTaxNumber:any;
  public companyAccountHolderName :any;
  public companyAccountNumber :any;
  public companyIFSC :any;
  public companyWhatsapp :any;
  public companyFacebook :any;
  public companyInstagram :any;
  public companyYoutube :any;
  public zoneId:number;
  public state: any;

  constructor(bannerRequest: any) {
    this.firstName = bannerRequest.firstName || '';
    this.lastName = bannerRequest.lastName || '';
    this.email = bannerRequest.email || '';
    this.mobileNumber = bannerRequest.mobileNumber || '';
    this.companyAddress1 = bannerRequest.companyAddress1 || '';
    this.companyAddress2 = bannerRequest.companyAddress2 || '';
    this.companyCity = bannerRequest.companyCity || '';
    this.companyCountryId = bannerRequest.companyCountryId || '';
    this.companyGstNumber = bannerRequest.companyGstNumber || '';
    this.reset= bannerRequest.reset;
    this.companyLogo = bannerRequest.companyLogo || '';
    this.companyLogoPath = bannerRequest.companyLogoPath || '';
    this.companyEmailId = bannerRequest.companyEmailId || '';
    this.companyName = bannerRequest.companyName || '';
    this.displayNameUrl = bannerRequest.displayNameUrl || '';
    this.companyPanNumber = bannerRequest.companyPanNumber || '';
    this.companyState = bannerRequest.companyState || '';
    this.companyMobileNumber = bannerRequest.companyMobileNumber || '';
    this.companyWebsite = bannerRequest.companyWebsite || '';
    this.countryName = bannerRequest.countryName || '';
    this.paymentInformation = bannerRequest.paymentInformation || '';
    this.pincode = bannerRequest.pincode || 0;
    this.avatar = bannerRequest.avatar || '';
    this.companyCoverImage = bannerRequest.companyCoverImage || '';
    this.companyBankName = bannerRequest.companyBankName || '';
    this.companyTaxNumber = bannerRequest.companyTaxNumber || '';
    this.companyAccountHolderName = bannerRequest.companyAccountHolderName || '';
    this.companyAccountNumber = bannerRequest.companyAccountNumber || '';
    this.companyIFSC = bannerRequest.companyIFSC || '';
    this.companyWhatsapp = bannerRequest.companyWhatsapp || '';
    this.companyFacebook = bannerRequest.companyFacebook || '';
    this.companyInstagram = bannerRequest.companyInstagram || '';
    this.companyYoutube = bannerRequest.companyYoutube || '';
   
    if(bannerRequest.zoneId){
      this.zoneId = bannerRequest.zoneId || '';
      this.state = '';
    }else{
      this.state = bannerRequest.state;
      this.zoneId = 0;
    }
  }
}
