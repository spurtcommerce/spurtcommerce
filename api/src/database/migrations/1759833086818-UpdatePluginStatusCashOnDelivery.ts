import { Plugins } from '../../api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../loaders/typeormLoader';

export class UpdatePluginStatusCashOnDelivery1759833086818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const cashOnDeliveryPlugin = await pluginRepository.findOne({ where: { slugName: 'cash-on-delivery' } });
        if (cashOnDeliveryPlugin) {
            cashOnDeliveryPlugin.pluginStatus = 0;
            await pluginRepository.save(cashOnDeliveryPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
