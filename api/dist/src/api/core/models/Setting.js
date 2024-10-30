"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let Settings = class Settings extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'settings_id' }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "settingsId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'site_url' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "siteUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keywords' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'site_name' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "siteName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'business_name' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "businessName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_owner' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeOwner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_name' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_description' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'access_key' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "accessKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'site_category' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "siteCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_address1' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeAddress1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_address2' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeAddress2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_city' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_postal_code' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storePostalCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'zone_id' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "zoneId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'order_status' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "orderStatus", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'store_email' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeEmail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_telephone' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeTelephone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_fax' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeFax", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "emailLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "emailLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "invoiceLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "invoiceLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'maintenance_mode' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "maintenanceMode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_language_name' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeLanguageName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_secondary_language_name' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeSecondaryLanguageName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_currency_id' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "storeCurrencyId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "currencySymbol", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'currency_format' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "currencyFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_image' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeImage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'store_image_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "storeImagePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'date_format' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "dateFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'time_format' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "timeFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_country' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "defaultCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_guest_allowed' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "isGuestAllowed", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'facebook' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "facebook", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'google' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "google", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'twitter' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "twitter", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'instagram' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "instagram", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "linkedin", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'youtube' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "youtube", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'youtube_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "youtubeLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'x_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "xLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "linkedinLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'facebook_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "facebookLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'instagram_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "instagramLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'social_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "socialPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_prefix' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "invoicePrefix", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_product_count' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "categoryProductCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'items_per_page' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "itemsPerPage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'addons' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "addons", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'pending_status' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "pendingStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_website' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "defaultWebsite", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_language_id' }),
    tslib_1.__metadata("design:type", Number)
], Settings.prototype, "defaultLanguageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'admin_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "adminLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'admin_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "adminLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'seller_logo' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "sellerLogo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'seller_logo_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "sellerLogoPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'seller_logo2' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "sellerLogo2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'seller_logo2_path' }),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "sellerLogo2Path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Settings.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Settings.prototype, "updateDetails", null);
Settings = tslib_1.__decorate([
    (0, typeorm_1.Entity)('settings')
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=Setting.js.map