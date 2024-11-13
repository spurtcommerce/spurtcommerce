/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class SellerUpdateRequest {

  public customerGroupId: any;
  public firstName: string;
  public lastName: string;
  public mobileNumber: number;
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
  public paymentInformation: string;
  public companyEmailId: string;
  public companyGstNumber: any;
  public companyCoverImage: any;
  public password: string;
  public confirmPassword: string;
  public vendorGroupId: string;
  public accountHolderName: string;
  public displayNameUrl: any;
  public youtube: any;
  public instagram: any;
  public whatsApp: any;
  public facebook: any;
  public bankName: any;
  bankDetails: any;
  public vendorDocuments: any;
  public zoneId: number;
  state: any;
  public email: string;
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

  constructor(sellerUpdateRequest: any) {
  
    this.customerGroupId = sellerUpdateRequest.customerGroupId || 'null';
    this.firstName = sellerUpdateRequest.firstName || '';
    this.lastName = sellerUpdateRequest.lastName || '';
    this.mobileNumber = sellerUpdateRequest.mobileNumber || '';
    this.avatar = sellerUpdateRequest.avatar || '';
    this.companyName = sellerUpdateRequest.companyName || '';
    this.companyLogo = sellerUpdateRequest.companyLogo || '';
    this.companyDescription = sellerUpdateRequest.companyDescription || '';
    this.companyAddress1 = sellerUpdateRequest.companyAddress1 || '';
    this.companyAddress2 = sellerUpdateRequest.companyAddress2 || '';
    this.companyCity = sellerUpdateRequest.companyCity || '';
    this.companyCountryId = sellerUpdateRequest.companyCountryId || null;
    this.companyState = sellerUpdateRequest.companyState || '';
    this.pincode = sellerUpdateRequest.pincode || '';
    this.companyWebsite = sellerUpdateRequest.companyWebsite || '';
    this.mailStatus = sellerUpdateRequest.mailStatus || 0;
    this.status = sellerUpdateRequest.status || 0;
    this.approvalFlag = sellerUpdateRequest.approvalFlag || 0;
    this.commission = sellerUpdateRequest.commission || '';
    this.customerId = sellerUpdateRequest.customerId || '';
    this.paymentInformation = sellerUpdateRequest.paymentInformation || '';
    this.companyEmailId = sellerUpdateRequest.companyEmailId || '';
    this.companyCoverImage = sellerUpdateRequest.companyCoverImage || '';
    this.password = sellerUpdateRequest.password || '';
    this.confirmPassword = sellerUpdateRequest.confirmPassword || '';
    this.companyGstNumber = sellerUpdateRequest.companyGstNumber || '';
    this.vendorGroupId = sellerUpdateRequest.vendorGroupId || '';
    this.displayNameUrl = sellerUpdateRequest.displayNameUrl || '';
    this.instagram = sellerUpdateRequest.instagram || '';
    this.youtube = sellerUpdateRequest.youtube || '';
    this.facebook = sellerUpdateRequest.facebook || '';
    this.whatsApp = sellerUpdateRequest.whatsApp || '';
    this.vendorDocuments = sellerUpdateRequest.vendorDocuments || [];
    this.email = sellerUpdateRequest.email || '';
    this.companyTaxNumber = sellerUpdateRequest.companyTaxNumber || '';
    this.companyAccountHolderName = sellerUpdateRequest.companyAccountHolderName;
    this.companyAccountNumber = sellerUpdateRequest.companyAccountNumber || '';
    this.companyAccountBranch = sellerUpdateRequest.companyAccountBranch || '';
    this.companyAccountCreatedOn = sellerUpdateRequest.companyAccountCreatedOn || '';
    this.companyAccountBankName = sellerUpdateRequest.companyAccountBankName || '';
    this.companyAccountBic = sellerUpdateRequest.companyAccountBic || '';
    this.ifscCode = sellerUpdateRequest.ifscCode || '';
    this.industryId = sellerUpdateRequest.industryId || '';
    this.companyBusinessNumber = sellerUpdateRequest.businessNumber || '';

    if (sellerUpdateRequest.zoneId) {
      this.zoneId = sellerUpdateRequest.zoneId || ''
      this.state = ''
    } else {
      this.state = sellerUpdateRequest.state;
      this.zoneId = 0;
    }
  }
}
