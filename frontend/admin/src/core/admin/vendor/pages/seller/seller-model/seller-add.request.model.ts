/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class SellerAddRequest {

  public customerGroupId: any;
  public firstName: string;
  public lastName: string;
  public email: string;
  public mobileNumber: number;
  public password: string;
  public confirmPassword: string;
  public avatar: string;
  public companyName: string;
  public companyLogo: string;
  public companyDescription: string;
  public companyAddress1: string;
  public companyAddress2: string;
  public companyCity: string;
  public companyState: string;
  public companyCountryId: number;
  public pincode: string;
  public companyWebsite: string;
  public mailStatus: number;
  public status: number;
  public approvalFlag: number;
  public commission: number;
  public customerId: number;
  public vendorId: number;
  public companyGstNumber: any;
  public companyCoverImage: any;
  public vendorGroupId: any;
  public displayNameUrl: any;
  public youtube: any;
  public instagram: any;
  public twitter: any;
  public facebook: any;
  bankDetails: any;
  public vendorDocuments: any;
  public zoneId: number;
  state: string;
  companyTaxNumber: number;
  companyAccountHolderName: string;
  companyAccountNumber: number;
  companyAccountBranch: string;
  companyAccountCreatedOn: string;
  companyAccountBankName: string;
  companyAccountBic: string;
  ifscCode: any;
  industryId: number;
  companyBusinessNumber: string;

  constructor(sellerAddRequest: any) {
    this.customerGroupId = sellerAddRequest.customerGroupId || 'null';
    this.firstName = sellerAddRequest.firstName || '';
    this.lastName = sellerAddRequest.lastName || '';
    this.email = sellerAddRequest.email || '';
    this.mobileNumber = sellerAddRequest.mobileNumber || '';
    this.password = sellerAddRequest.password || '';
    this.confirmPassword = sellerAddRequest.confirmPassword || '';
    this.avatar = sellerAddRequest.avatar || '';
    this.companyName = sellerAddRequest.companyName || '';
    this.companyLogo = sellerAddRequest.companyLogo || '';
    this.companyDescription = sellerAddRequest.companyDescription || '';
    this.companyAddress1 = sellerAddRequest.companyAddress1 || '';
    this.companyAddress2 = sellerAddRequest.companyAddress2 || '';
    this.companyCity = sellerAddRequest.companyCity || '';
    this.companyCountryId = sellerAddRequest.companyCountryId || null;
    this.companyState = sellerAddRequest.companyState || '';
    this.pincode = sellerAddRequest.pincode || '';
    this.companyWebsite = sellerAddRequest.companyWebsite || '';
    this.mailStatus = sellerAddRequest.mailStatus || 0;
    this.status = sellerAddRequest.status || 0;
    this.approvalFlag = sellerAddRequest.approvalFlag || 0;
    this.commission = sellerAddRequest.commission || '';
    this.customerId = sellerAddRequest.customerId || '';
    this.companyGstNumber = sellerAddRequest.companyGstNumber || '';
    this.companyCoverImage = sellerAddRequest.companyCoverImage || '';
    this.vendorGroupId = sellerAddRequest.vendorGroupId || '';
    this.displayNameUrl = sellerAddRequest.displayNameUrl || '';
    this.instagram = sellerAddRequest.instagram || '';
    this.youtube = sellerAddRequest.youtube || '';
    this.facebook = sellerAddRequest.facebook || '';
    this.twitter = sellerAddRequest.twitter || '';
    this.companyTaxNumber = sellerAddRequest.companyTaxNumber || '';
    this.companyAccountHolderName = sellerAddRequest.companyAccountHolderName;
    this.companyAccountNumber = sellerAddRequest.companyAccountNumber || '';
    this.companyAccountBranch = sellerAddRequest.companyAccountBranch || '';
    this.companyAccountCreatedOn = sellerAddRequest.companyAccountCreatedOn || '';
    this.companyAccountBankName = sellerAddRequest.companyAccountBankName || '';
    this.companyAccountBic = sellerAddRequest.companyAccountBic || '';
    this.ifscCode = sellerAddRequest.ifscCode || '';
    this.industryId = sellerAddRequest.industryId || '';
    this.companyBusinessNumber = sellerAddRequest.businessNumber || '';
    this.vendorDocuments = sellerAddRequest.vendorDocuments || []
    if (sellerAddRequest.zoneId) {
      this.zoneId = sellerAddRequest.zoneId || ''
    } else {
      this.zoneId = 0;
    }
  }

}
