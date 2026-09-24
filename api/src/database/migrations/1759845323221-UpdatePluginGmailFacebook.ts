import { Plugins } from '../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdatePluginGmailFacebook1759845323221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const gmailPlugin = await pluginRepository.findOne({ where: { slugName: 'gmail' } });
        if (gmailPlugin) {
            gmailPlugin.pluginAvatar = 'gmail.png';
            gmailPlugin.pluginAvatarPath = 'addon/';
            await pluginRepository.save(gmailPlugin);
        }

        const facebookPlugin = await pluginRepository.findOne({ where: { slugName: 'facebook' } });
        if (facebookPlugin) {
            facebookPlugin.pluginAvatar = 'facebook.png';
            facebookPlugin.pluginAvatarPath = 'addon/';
            await pluginRepository.save(facebookPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
