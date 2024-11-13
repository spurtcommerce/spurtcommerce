/*
 * spurtcommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ProfileModel {
  public companyAddress1: string;
  public companyAddress2: string;
  public companyCity: string;
  public commission: number;
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
  public customerDetail: any;
  public paymentInformation: any;
  public pincode: any;
  public vendorCategories: any;
  public vendorId: any;
  public customerId: any;
  public companyCoverImagePath: any;
  public companyCoverImage: any;
  public companyBankName :any;
  public companyTaxNumber:any;
  public companyAccountHolderName :any;
  public companyAccountNumber :any;
  public companyIFSC :any;
  public reset: number;
  public companyWhatsapp :any;
  public companyFacebook :any;
  public companyInstagram :any;
  public companyYoutube :any;

  constructor(bannerRequest: any) {
    this.companyAddress1 = bannerRequest.companyAddress1 || '';
    this.companyAddress2 = bannerRequest.companyAddress2 || '';
    this.companyCity = bannerRequest.companyCity || '';
    this.commission = bannerRequest.commission || 0;
    this.companyCountryId = bannerRequest.companyCountryId || '';
    this.companyGstNumber = bannerRequest.companyGstNumber || '';
    this.companyLogo = bannerRequest.companyLogo || '';
    this.companyLogoPath = bannerRequest.companyLogoPath || '';
    this.companyEmailId = bannerRequest.companyEmailId || '';
    this.companyName = bannerRequest.companyName || '';
    this.displayNameUrl = bannerRequest.displayNameUrl || '';
    this.reset= bannerRequest.reset;
    this.companyPanNumber = bannerRequest.companyPanNumber || '';
    this.companyState = bannerRequest.companyState || '';
    this.companyMobileNumber = bannerRequest.companyMobileNumber === '0' || 0 ? '' : bannerRequest.companyMobileNumber;
    this.companyWebsite = bannerRequest.companyWebsite || '';
    this.countryName = bannerRequest.countryName || '';
    this.customerDetail = bannerRequest.customerDetail || {};
    this.paymentInformation = bannerRequest.paymentInformation || {};
    this.pincode = bannerRequest.pincode || '';
    this.vendorCategories = bannerRequest.vendorCategories || {};
    this.vendorId = bannerRequest.vendorId || 0;
    this.customerId = bannerRequest.customerId || 0;
    this.companyCoverImage = bannerRequest.companyCoverImage || '';
    this.companyCoverImagePath = bannerRequest.companyCoverImagePath || '';
    this.companyBankName = bannerRequest.companyBankName || '';
    this.companyTaxNumber = bannerRequest.companyTaxNumber || '';
    this.companyAccountHolderName = bannerRequest.companyAccountHolderName || '';
    this.companyAccountNumber = bannerRequest.companyAccountNumber || '';
    this.companyIFSC = bannerRequest.companyIFSC || '';
    this.companyWhatsapp = bannerRequest.companyWhatsapp || '';
    this.companyFacebook = bannerRequest.companyFacebook || '';
    this.companyInstagram = bannerRequest.companyInstagram || '';
    this.companyYoutube = bannerRequest.companyYoutube || '';
  
  }
}
