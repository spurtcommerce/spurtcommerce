"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const Customer_1 = require("./Customer");
const VendorProducts_1 = require("./VendorProducts");
const VendorOrders_1 = require("./VendorOrders");
const VendorOrderLog_1 = require("./VendorOrderLog");
const VendorOrderArchive_1 = require("./VendorOrderArchive");
const VendorOrderArchiveLog_1 = require("./VendorOrderArchiveLog");
const VendorPayment_1 = require("./VendorPayment");
const VendorPaymentArchive_1 = require("./VendorPaymentArchive");
const class_validator_1 = require("class-validator");
const VendorCategory_1 = require("./VendorCategory");
const VendorGroup_1 = require("../models/VendorGroup");
const VendorContact_1 = require("./VendorContact");
let Vendor = class Vendor extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_prefix_id' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "vendorPrefixId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_group_id' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "vendorGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'commission' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "commission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "contactPersonName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_slug_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "vendorSlugName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'designation' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "designation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_address1' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_address2' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_city' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_state' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyState", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'zone_id' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "zoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_country_id' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "companyCountryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'pincode' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "pincode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_description' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_mobile_number' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "companyMobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_email_id' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyEmailId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_website' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyWebsite", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_gst_number' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyTaxNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_pan_number' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyPanNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_logo' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'payment_information' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "paymentInformation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'approval_flag' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "approvalFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "approvedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'approved_date' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "approvalDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_cover_image' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyCoverImage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company_cover_image_path' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "companyCoverImagePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'display_name_url' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "displayNameUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'instagram' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "instagram", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'twitter' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "twitter", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'youtube' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "youtube", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'facebook' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "facebook", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'whatsapp' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "whatsapp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'bank_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "bankName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'account_number' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "bankAccountNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'account_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "accountHolderName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ifsc_code' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "ifscCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], Vendor.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => VendorGroup_1.VendorGroup, vendorGroup => vendorGroup.vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_group_id' }),
    tslib_1.__metadata("design:type", VendorGroup_1.VendorGroup)
], Vendor.prototype, "vendorGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorProducts_1.VendorProducts, vendorproducts => vendorproducts.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendorProducts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrders_1.VendorOrders, vendororders => vendororders.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendororder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderLog_1.VendorOrderLog, vendororderlog => vendororderlog.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendororderlog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchive_1.VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendorOrderArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorOrderArchiveLog_1.VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendorOrderArchiveLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorPayment_1.VendorPayment, vendorPayment => vendorPayment.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendorPayment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorPaymentArchive_1.VendorPaymentArchive, vendorPaymentArchive => vendorPaymentArchive.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "vendorPaymentArchive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorCategory_1.VendorCategory, vendorcategory => vendorcategory.vendor),
    tslib_1.__metadata("design:type", VendorCategory_1.VendorCategory)
], Vendor.prototype, "vendorcategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => VendorContact_1.VendorContact, vendorContact => vendorContact.vendor),
    tslib_1.__metadata("design:type", VendorContact_1.VendorContact)
], Vendor.prototype, "vendorContact", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Vendor.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Vendor.prototype, "updateDetails", null);
Vendor = tslib_1.__decorate([
    (0, typeorm_1.Entity)('vendor')
], Vendor);
exports.Vendor = Vendor;
//# sourceMappingURL=Vendor.js.map