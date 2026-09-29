import { VendorSettings } from '../../api/core/models/VendorSettings';
import { Currency } from '../../api/core/models/Currency';
import { getDataSource } from '../../../src/loaders/typeormLoader';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeVendorSettingsCurrencyReftoMaster1758349487114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const getCurrencyRepo = getDataSource().getRepository(Currency);

        const getInrCurrency = await getCurrencyRepo.findOne({ where: { code: 'INR' } });

        const getVendorSettingsRepo = getDataSource().getRepository(VendorSettings);

        await getVendorSettingsRepo.updateAll({ storeCurrencyId: getInrCurrency.currencyId });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
