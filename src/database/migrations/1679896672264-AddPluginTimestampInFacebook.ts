import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../src/api/core/models/Plugin';

export class AddPluginTimestampInFacebook1679896672264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                pluginName: 'Facebook',
            },
        });
        if (plugin) {
            plugin.slugName = 'facebook';
            plugin.pluginTimestamp = 1648273183310; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
