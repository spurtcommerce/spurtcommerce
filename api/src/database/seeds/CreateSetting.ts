import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Settings } from '../../api/core/models/Setting';
export class CreateSetting implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const setting = new Settings();
            setting.settingsId = 1;
            setting.siteUrl = 'www.yourURL.com';
            setting.metaTagTitle = 'your title';
            setting.metaTagDescription = 'your Description';
            setting.metaTagKeyword = 'keywords';
            setting.siteName = 'your store name';
            setting.storeOwner = 'owner name';
            setting.storeAddress1 = 'store address';
            setting.zoneId = 1;
            setting.storeEmail = 'storeemail@example.com';
            setting.storeTelephone = '0123456789';
            setting.storeFax = 'fax number';
            setting.storeLogo = 'yourStoreLogo.jpg';
            setting.maintenanceMode = 1;
            setting.storeLanguageName = 'store language';
            setting.storeCurrencyId = 1;
            setting.storeImage = 'storeImage.png';
            setting.invoicePrefix = 'SPU';
            setting.orderStatus = 1;
            setting.categoryProductCount = 1;
            setting.itemsPerPage = 5;
            setting.google = 'your google account';
            setting.instagram = 'instagram account';
            setting.facebook = 'fb account';
            setting.twitter = 'twitter account';
            setting.isActive = 1;
            return await em.save(setting);
    }
}
