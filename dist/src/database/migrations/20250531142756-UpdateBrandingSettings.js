"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandingSettings20250531142756 = void 0;
const tslib_1 = require("tslib");
const Setting_1 = require("../../api/core/models/Setting");
class UpdateBrandingSettings20250531142756 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settingsRepository = queryRunner.manager.getRepository(Setting_1.Settings);
            // Attempt to find the existing setting with settings_id = 1
            let setting = yield settingsRepository.findOne({ where: { settingsId: 1 } });
            if (setting) {
                setting.siteUrl = 'https://dankdeals.org';
                setting.metaTagTitle = 'Dank Deals - Twin Cities Cannabis Marketplace';
                setting.metaTagDescription = 'Your premier destination for cannabis in the Twin Cities. Find the best local deals on flower, edibles, and more.';
                setting.metaTagKeyword = 'cannabis, Twin Cities, Minneapolis, St. Paul, marijuana, dispensaries, Dank Deals, local cannabis deals';
                setting.storeName = 'Dank Deals';
                setting.storeEmail = 'info@dankdeals.org';
                setting.storeLogo = 'dank_deals_logo.svg'; // Assuming a new generic logo name
                setting.storeLogoPath = 'uploads/logo/'; // Standard path
                setting.facebook = 'https://www.facebook.com/dankdealsTC';
                setting.twitter = 'https://twitter.com/dankdealsTC';
                setting.instagram = 'https://www.instagram.com/dankdealsTC';
                setting.google = ''; // Clear Google+
                yield settingsRepository.save(setting);
                console.log('Branding settings updated for settings_id = 1');
            }
            else {
                // Fallback or error handling if settings_id = 1 is not found
                // This might involve inserting a new record or logging an error
                // For now, we'll log a message.
                console.log('Settings record with settings_id = 1 not found. No branding updates applied.');
                // Optionally, you could try to find by a default store name if that's more stable
                // let settingByName = await settingsRepository.findOne({ where: { storeName: 'your store name' } });
                // if (settingByName) { ... apply changes ... }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Minimal down migration: Revert to known placeholder values or log
            const settingsRepository = queryRunner.manager.getRepository(Setting_1.Settings);
            let setting = yield settingsRepository.findOne({ where: { settingsId: 1 } });
            if (setting) {
                // Revert to some default/original values if known, or placeholders
                setting.siteUrl = ''; // Or original value from seed
                setting.metaTagTitle = 'Spurtcommerce'; // Original or generic placeholder
                setting.metaTagDescription = 'Spurtcommerce description';
                setting.metaTagKeyword = 'spurtcommerce keywords';
                setting.storeName = 'Spurtcommerce';
                setting.storeEmail = 'info@spurtcommerce.com';
                setting.storeLogo = 'store_logo.png'; // Original logo name
                setting.storeLogoPath = 'uploads/logo/';
                setting.facebook = '';
                setting.twitter = '';
                setting.instagram = '';
                setting.google = '';
                yield settingsRepository.save(setting);
                console.log('Branding settings reverted for settings_id = 1 (minimal rollback)');
            }
            else {
                console.log('Settings record with settings_id = 1 not found. No rollback action taken.');
            }
        });
    }
}
exports.UpdateBrandingSettings20250531142756 = UpdateBrandingSettings20250531142756;
//# sourceMappingURL=20250531142756-UpdateBrandingSettings.js.map