import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBrandingSettings20250531142756 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const settingsRepository = queryRunner.manager.getRepository('settings');

        // Attempt to find the existing setting with settings_id = 1
        let setting = await settingsRepository.findOne({ where: { settingsId: 1 } });

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

            await settingsRepository.save(setting);
            console.log('Branding settings updated for settings_id = 1');
        } else {
            // Fallback or error handling if settings_id = 1 is not found
            // This might involve inserting a new record or logging an error
            // For now, we'll log a message.
            console.log('Settings record with settings_id = 1 not found. No branding updates applied.');
            // Optionally, you could try to find by a default store name if that's more stable
            // let settingByName = await settingsRepository.findOne({ where: { storeName: 'your store name' } });
            // if (settingByName) { ... apply changes ... }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Minimal down migration: Revert to known placeholder values or log
        const settingsRepository = queryRunner.manager.getRepository('settings');
        let setting = await settingsRepository.findOne({ where: { settingsId: 1 } });

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

            await settingsRepository.save(setting);
            console.log('Branding settings reverted for settings_id = 1 (minimal rollback)');
        } else {
            console.log('Settings record with settings_id = 1 not found. No rollback action taken.');
        }
    }
}
