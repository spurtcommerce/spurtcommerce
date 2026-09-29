import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPluginTimestampInSeo1679898902620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                slugName: 'seo',
            },
        });
        if (plugin) {
            plugin.pluginName = 'Seo';
            plugin.pluginTimestamp = 1665123762673; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
